import React, {useState} from 'react';
import Layout from "../../../hoc/Layout";
import Developer from "../uploadContract/Developer";
import ExplorerContract from "../smartContract/ExplorerContract";
import {alphabetRegex} from "../../ui/Helpers";
import {Button, Form, Grid, Select} from "semantic-ui-react";
import CustomizedSlider from "../../ui/slider";
import square_blue from "../../../assets/images/square_blue.png";
import ContractCard from "../smartContract/ContractCard";
import {CheckBox} from "../../ui/FormFields";
import DappsCard from "./DappsCard";
import {useQuery} from "@apollo/client";
import {getDapps} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {Spinner2} from "../../ui/Spinner";

const Dapps = () => {
    const [searchValue,setsearchValue]=useState("");
    const [sliderMinValue,setsliderMinValue]=useState(0)
    const [sliderMaxValue,setsliderMaxValue]=useState(2000);
    const [visible,setvisible]=useState(0)
    const [sort,setsort]=useState('');
    const [searchData,setsearchData]=useState('null')
    const [name,setname]=useState("");
    const [tag,settag]=useState("");
    const [searchLoading,setsearchLoading]=useState(false);
    const [checkboxs,setcheckboxs]=useState([
        {check:false,name:"DOCUMENTS"},
        {check:false,name:"SOCIAL"},
        {check:false,name:"FINANCIAL"},
        {check:false,name:"ESCROW"},
        {check:false,name:"TOOLS"},
        {check:false,name:"UTILITY"},
    ])

    const selectOptions = [
        { key: 'N', value: 'NEWEST', text: 'Newest contract' },
        { key: 'L', value: 'LOW_TO_HIGH', text: 'Price: low to high' },
        { key: 'H', value: 'HIGH_TO_LOW', text: 'Price: high to low' },
    ]
    const handleChange = event => {
        const {name,value}=event.target;
        switch (name){
            case 'searchValue':
                alphabetRegex.test(value)&&setsearchValue(value)
                value===""&&setsearchValue("")
                break;
            case 'sort':
                alphabetRegex.test(value)&&setsort(value)
                value===""&&setsort("")
                break
            case 'tag':
                alphabetRegex.test(value)&&settag(value)
                value===""&&settag("")
                break;
            case 'name':
                alphabetRegex.test(value)&&setname(value)
                value===""&&setname("")
                break
            default:
                break;
        }
    }
    const RenderCard=()=>{
        const {loading,data,error}=useQuery(getDapps,{
            client:Client,
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            },
        })
        if(loading) return <Spinner2/>
        if(error) return <div>{error.toString()}</div>
        console.log(data)
        return <DappsCard searchData={data.dApps}/>
    }
    function onKeyUp(event) {
        if (event.charCode === 13) {
            if (searchValue!=="") {
                OnSubmit();
            }
        }
    }
    const onSearch=()=>{
        if (searchValue!=="") {
            OnSubmit();
        }
    }
    const OnSubmit=()=>{
        const category=[];
        checkboxs.map(checkbox=>{
            if (checkbox.check){
                category.push(checkbox.name)
            }
        });
        // const input= {}
        // if (name!==""){
        //     input["contractName"]=name
        // }
        // if (sort!=="") {
        //     input["sortBy"] = sort
        // }
        // if (tag!==""){
        //     input["tags"]=tag
        // }
        // if (category.length>0){
        //     input["contractCategory"]=category
        // }
        // if (searchValue!==""){
        //     input["contractName"]=searchValue;
        // }
        // input["minPrice"]=sliderMinValue.toString();
        // input["maxPrice"]=sliderMaxValue.toString();
    }
    const renderCheckbox=()=>(
        checkboxs.map((check,index)=>(
            <CheckBox
                key={check.name} check={check.check}
                name={check.name} index={index}
                change={(element)=> updateCheckBox(element)}/>
        ))
    )
    function updateCheckBox (element){
        const newData =  Object.assign([], checkboxs);
        for (let i=0;i<6;i++){
            if (i===element.index){
                newData[i].check = newData[i].check !== true;
            }
        }
        setcheckboxs(newData);
    }
    return (
        <Layout>
            <ExplorerContract
                type={'dapps'}
                onKeyUp={(event)=>onKeyUp(event)}
                value={searchValue}
                change={(event)=>handleChange(event)}
                onSearch={onSearch}
            />
            <Grid className={'contract_container'} >
                <Grid.Column width={4}>
                    <Form>
                        <Form.Field>
                            <label>Sort By:</label>
                            <Select
                                value={sort} options={selectOptions}
                                onChange={(event,{value})=>{
                                    setsort(value);
                                }} name={'sort'} fluid
                                type={'select'} placeholder={"Choose"}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Filter Smart Contract:</label>
                            <Form.Input
                                placeholder={"Enter Search Terms"} type={"text"}
                                value={name}
                                name="name" onChange={(event)=>handleChange(event)} />
                        </Form.Field>

                        <Form.Field>
                            <label>Filter by Tags</label>
                            <Form.Input
                                placeholder={"Enter Search Terms"} type={"text"}
                                value={tag}
                                name="tag" onChange={(event)=>handleChange(event)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Select Categories</label>
                            {renderCheckbox()}
                        </Form.Field>
                        {<CustomizedSlider
                            changeSlider={(event,value)=> {
                                setsliderMinValue(value[0])
                                setsliderMaxValue(value[1])
                            }}
                        />}
                        <span className={"slider_value"}>{sliderMinValue}-{sliderMaxValue} Dapps</span>
                        {<Button fluid loading={searchLoading}  onClick={OnSubmit}>Apply</Button>}
                    </Form>
                </Grid.Column>
                <Grid.Column width={12}>
                    <img className={"square_block"} src={square_blue} alt={"square"}/>
                    <h2>Our <span>Products</span></h2>
                    {RenderCard()}
                </Grid.Column>
            </Grid>
            <Developer type={"dapps"} link={'/upload_dapps'}/>
        </Layout>
    );
};

export default Dapps;