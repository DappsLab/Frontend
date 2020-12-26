import React, {Component} from 'react';
import ContractCard from "./ContractCard";
import "../../../assets/scss/SmartContracts.css"
import '../../../assets/scss/custom_smart_contract.css'
import "../../../assets/scss/app.css"
import Layout from "../../../hoc/Layout";
import {Button, Form, Grid, Select} from "semantic-ui-react";
import CustomizedSlider from "../../ui/slider";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {alphabetRegex} from '../../ui/Helpers'
import {CheckBox} from "../../ui/FormFields";
import square_blue from "../../../assets/images/square_blue.png";
import Developer from "../uploadContract/Developer";
import ExplorerContract from "./ExplorerContract";
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
class Smart_Contracts extends Component {
    state={
        sliderMinValue:0,
        sliderMaxValue:1500,
        show:false,
        loading:false,
        sort:'',
        name:"",
        tag:"",
        searchdata:null,
        searchValue:"",
        searchError:"",
        checkboxs:[
            {check:false,name:"DOCUMENTS"},
            {check:false,name:"SOCIAL"},
            {check:false,name:"FINANCIAL"},
            {check:false,name:"ESCROW"},
            {check:false,name:"TOOLS"},
            {check:false,name:"UTILITY"},
        ]
    }
    countryOptions = [
        { key: 'N', value: 'NEWEST', text: 'Newest contract' },
        { key: 'L', value: 'LOW_TO_HIGH', text: 'Price: low to high' },
        { key: 'H', value: 'HIGH_TO_LOW', text: 'Price: high to low' },
    ]
    setSliderValues=(event,value)=>{
        this.setState({sliderMinValue:value[0],sliderMaxValue:value[1]})
    }
    handleChange = event => {
        const {name,value}=event.target;
        if (alphabetRegex.test(value)){
            this.setState({[name]:value},()=>{});
        }
        if (value===""){
            this.setState({[name]:value},()=>{});
        }
    }
    onKeyUp(event) {
        if (event.charCode === 13) {
            if (this.state.searchValue!=="") {
                this.onSubmit();
            }
        }

    }
    onSearch=()=>{
        if (this.state.searchValue!=="") {
            this.onSubmit();
        }
    }
    updateCheckBox (element){
        const newData =  Object.assign([], this.state.checkboxs);
        for (let i=0;i<6;i++){
            if (i===element.index){
                newData[i].check = newData[i].check !== true;
            }
        }
        this.setState({checkboxs:newData});
    }
    onSubmit=()=>{
        this.setState({loading:true});
        const that=this;
        let {searchValue,sort,tag,checkboxs,sliderMaxValue,sliderMinValue,name}=this.state;
        const category=[];
        checkboxs.map(checkbox=>{
            if (checkbox.check){
                category.push(checkbox.name)
            }
        });
        const input= {}
        if (name!==""){
            input["contractName"]=name
        }
        if (sort!=="") {
            input["sortBy"] = sort
        }
        if (tag!==""){
            input["tags"]=tag
        }
        if (category.length>0){
            input["contractCategory"]=category
        }
        if (searchValue!==""){
            input["contractName"]=searchValue;
        }
        input["minPrice"]=sliderMinValue.toString();
        input["maxPrice"]=sliderMaxValue.toString();
        client.query({
            query: gql`query ($input:SearchSmartContract){
                filterSmartContract(searchSmartContract:$input) {
                    contractName  description id tags contractCategory
                    image shortDescription publishingDateTime
                    publisher {
                        fullName
                        avatar
                    }
                    singleLicensePrice
                }
            }`,
            variables:{input}
        }).then(result =>{
            if (result.data.filterSmartContract.length>0){
                that.setState({loading:false,searchValue:"",searchError:"",searchdata:result.data.filterSmartContract})
            }else {
                that.setState({searchValue:"",loading:false,searchError:"Not Found"})
            }
        }).catch(error=>{
            console.log(error.toString())
            that.setState({searchValue:"",loading:false,searchError:"Not Found"})
        })
    }
    renderCheckbox=()=>(
        this.state.checkboxs.map((check,index)=>(
            <CheckBox
                key={check.name} check={check.check}
                name={check.name} index={index}
                change={(element)=> this.updateCheckBox(element)}/>
        ))
    )
    render() {
        const {loading,searchError,searchValue,searchdata,name,sort,tag,sliderMinValue,sliderMaxValue}=this.state;
        return (
            <Layout>
                <ExplorerContract
                    type={'contract'}
                    onKeyUp={(event)=>this.onKeyUp(event)}
                    value={searchValue}
                    change={(event)=>this.handleChange(event)}
                    onSearch={this.onSearch}
                />
                <Grid className={'contract_container'} >
                    <Grid.Column width={4}>
                        <Form>
                            <Form.Field>
                                <label>Sort By:</label>
                                <Select
                                    value={sort} options={this.countryOptions}
                                    onChange={(event,{value})=>{
                                        this.setState({sort:value});
                                    }} name={'sort'} fluid
                                    type={'select'} placeholder={"Choose"}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Filter Smart Contract:</label>
                                <Form.Input
                                    placeholder={"Enter Search Terms"} type={"text"}
                                    value={name}
                                    name="name" onChange={this.handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Filter by Tags</label>
                                <Form.Input
                                    placeholder={"Enter Search Terms"} type={"text"}
                                    value={tag}
                                    name="tag" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Select Categories</label>
                                {this.renderCheckbox()}
                            </Form.Field>

                            {<CustomizedSlider
                                changeSlider={(event,value)=> this.setSliderValues(event,value)}
                            />}
                            <span className={"slider_value"}>{sliderMinValue}-{sliderMaxValue} Dapps</span>
                            {<Button fluid loading={loading}  onClick={this.onSubmit}>Apply</Button>}
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <img className={"square_block"} src={square_blue} alt={"square"}/>
                        <h2>Our <span>Products</span></h2>
                        {searchError.length>0?<div>{searchError}</div>:
                            <ContractCard searchdata={searchdata}/>
                        }
                    </Grid.Column>
                </Grid>
                <Developer type={"contract"} link={'/upload_samrt_contract'}/>
                <section className={'custom_section'}>
                    <h2>Custom <span>Smart Contract</span></h2>
                    <p> If you don't find what you need on our Marketplace you can submit a
                        bounty to be solved by the devs community.</p>
                    <Button onClick={()=>{this.props.history.push('/request_smart_contract')}}>Order Now</Button>
                </section>
            </Layout>
        );
    }
}

export default Smart_Contracts;
