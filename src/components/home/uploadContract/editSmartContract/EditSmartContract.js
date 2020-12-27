import React, { useState} from 'react';
import Layout from "../../../../hoc/Layout";
import '../../../../assets/scss/edit_smart_contract.css'
import { nameReg, numericReg} from "../../../ui/Helpers";
import {Button, Form, Grid, Header, Input, TextArea} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {useMutation, useQuery} from "@apollo/client";
import {contractById, editContract, imageUpload, me_Query, sourceUpload} from "../../../../queries/queries";
import {Spinner2} from "../../../ui/Spinner";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import Uploader from "../../../ui/Uploader";
import {GetSource} from "./GetSource";
import GetVersion from "../GetVersion";
import UploadImage from "../contractCompoent/UploadImage";
import Tags from "../contractCompoent/Tags";
import {ContractCategory} from "../contractCompoent/ContractFileds";


const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);
const EditSmartContract =(props)=> {
    const [cName,setcName]=useState("");
    const [fName,setfName]=useState("");
    const [cetagory,setCategory]=useState([]);
    const [newSource,setNewSource]=useState("");
    const [onePrice,setonePrice]=useState('');
    const [shortCounter,setshortCounter]=useState(200);
    const [uPrice,setuPrice]=useState("");
    const [Loading,setLoading]=useState(false)
    const [imgPath,setImgPath]=useState("");
    const [tags,setTag]=useState([]);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [version,setVersion]=useState("");
    const [contract,setContract]=useState(null);
    const  categoryOption=[
        {label: "TOOLS",value: "TOOLS"},
        {label: "FINANCIAL",value: "FINANCIAL"},
        {label: "DOCUMENTS",value: "DOCUMENTS"},
        {label: "UTILITY",value: "UTILITY"},
        {label: "SOCIAL",value: "SOCIAL"},
        {label: "ESCROW",value: "ESCROW"}
    ]
    const {alert,user}=props;



    const onInputChange=(event)=>{
        event.preventDefault();
        const {name,value}=event.target;
        switch (name){
            case 'cName':
                nameReg.test(value)&& setcName(value);
                value===""&&setcName("");
                break;
            case 'fName':
                nameReg.test(value)&& setfName(value);
                value===""&&setfName("");
                break;
            case 'onePrice':
                numericReg.test(value)&&setonePrice(value);
                value===""&&setonePrice("");
                break;
            case 'uPrice':
                numericReg.test(value)&&setuPrice(value);
                value===""&&setuPrice("");
                break;
            case "shortDescription":
                if (value.length<=200) {
                    descriptionRGP.test(value)&&setshortCounter(200-value.length)
                    descriptionRGP.test(value)&&setshortDescription(value);
                    value===""&&setshortDescription("");
                }
                break;
            default:
                break;
        }
    }

    const removeTags=(i)=> {
        setTag(tags.filter((tag, index) => index !== i))
    }
    const addTags = event => {
        if (event.target.value !== "") {
            setTag( [...tags ,event.target.value]);
            event.target.value = "";
        }
    }

    const [source]=useMutation(sourceUpload,{
        client:Client,
        onCompleted:data1 => {
            console.log(data1)
            setNewSource(data1.contractUploader);
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:2000})
            console.log(error1.toString())
        },
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
    })
    const Submit=(file)=>{
        source({variables:{file}}).catch(err=>{
            console.log(err.toString())
        })
    }
    const HnadleSubmit=(contract)=>{

        setLoading(true);
        let finalCategoryArray=[];
        for (let i = 0; i < cetagory.length; i++) {
            finalCategoryArray.push(cetagory[i]['value']);
        }

        updateContract({
            variables:{
                id:contract.id,
                fname: fName!==""?fName:contract.sourceContractName,
                name: cName!==""?cName:contract.contractName,
                image: imgPath!==""?imgPath:contract.image,
                short: shortDescription!==""?shortDescription:contract.shortDescription,
                category: finalCategoryArray.length>0?finalCategoryArray:contract.contractCategory,
                long: longDescription!==""?longDescription:contract.description,
                one: onePrice!==""?onePrice:contract.singleLicensePrice,
                tags: tags.length>0?tags:contract.tags,
                version:version!==''?version.toString():contract.compilerVersion,
                unlimited: uPrice!==""?uPrice.toString():contract.unlimitedLicensePrice,
                source:newSource!==""? newSource.toString():contract.source
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }

    const [updateContract]=useMutation(editContract,{
        client:Client,
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onCompleted:data => {
            setLoading(false);
            props.history.push('/dashboard/developed_contract');
            alert.success("Update Successfully",{timeout:2000})
            console.log(data)
        },onError:error => {
            setLoading(false);
            alert.error(error.toString(),{timeout:3000})
            console.log(error.toString())
        },
        refetchQueries:[{query:me_Query,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        }}]
    })
    const onConstVersion=(event)=>{
        const {value}=event.target;
        if (value==="select"){
            setVersion('')
        }else {
            setVersion(value)
        }
    }
    const RenderContractData=()=>{
        const {loading,error,data}=useQuery(contractById, {
            variables: {id: props.match.params.id},
            client: Client,
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            },onCompleted:data1 => {
                setContract(data1.smartContractById)
            }
        });
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        return <div> </div>
    }

    console.log(imgPath)
    return (
        <Layout>
        <section className={'edit_contract generalContainer'}>
            {RenderContractData()}
            {contract &&
            <Grid stretched columns={2} verticalAlign={'middle'}>
                <Grid.Column width={5}>
                    <Form>
                        <Form.Field>
                            <label>Contract Name</label>
                            <Input
                                type={'text'} placeholder={contract.contractName} name={'cName'} value={cName}
                                onChange={(event) => onInputChange(event)}/>
                        </Form.Field>
                        <ContractCategory category={cetagory} contract={contract} setCategory={setCategory}/>
                        {/*<Form.Field>*/}
                        {/*    <label>Contract Category:</label>*/}
                        {/*    <Select*/}
                        {/*        components={makeAnimated()}*/}
                        {/*        isMulti*/}
                        {/*        size={'large'}*/}
                        {/*        placeholder={contract.contractCategory}*/}
                        {/*        value={cetagory}*/}
                        {/*        onChange={(value) => setCategory(value)}*/}
                        {/*        name="contractCategory"*/}
                        {/*        options={categoryOption}*/}
                        {/*        className="basic-multi-select"*/}
                        {/*        classNamePrefix="select"*/}
                        {/*    />*/}
                        {/*</Form.Field>*/}
                        <Form.Field>
                            <label>Price per License</label>
                            <Input
                                fluid size={'large'} value={onePrice}
                                label={{basic: true, content: 'Dapps'}}
                                name={"onePrice"} placeholder={contract.singleLicensePrice}
                                onChange={(event) => onInputChange(event)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Unlimited License</label>
                            <Input
                                fluid size={'large'} value={uPrice}
                                label={{basic: true, content: 'Dapps'}}
                                name={"uPrice"} placeholder={contract.unlimitedLicensePrice}
                                onChange={(event) => onInputChange(event)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Contract Funcation Name</label>
                            <Input
                                type={'text'} placeholder={contract.sourceContractName} name={'fName'} value={fName}
                                onChange={(event) => onInputChange(event)}
                            />
                            <p className={"info"}>Name must be same as contract Funcation name</p>
                        </Form.Field>
                        <UploadImage imgPath={imgPath} setImgPath={setImgPath} />
                        <Tags tags={tags} setTag={setTag}/>
                        <Form.Field>
                            <label>Upload New Source</label>
                            <Uploader type={'contract'} onSubmit={(file) => Submit(file)}/>
                        </Form.Field>
                    </Form>
                    <GetVersion value={contract.compilerVersion} onConstVersion={(event) => onConstVersion(event)}/>
                    {user.type==="ADMIN"&&
                        <div>
                        <Button>Compile Test</Button>
                        </div>
                    }
                </Grid.Column>
                <Grid.Column width={11}>
                    <h1 style={{color:'#0FBA87'}}>Edit Smart contract</h1>
                    <div>
                        <Header as={'h3'} floated={'left'}>
                            Short Description
                        </Header>
                        <Header as={'span'} floated={'right'}>
                            Characters left: {shortCounter}
                        </Header>
                        <Form>
                            <TextArea
                                value={shortDescription} placeholder={contract.shortDescription}
                                name={"shortDescription"}
                                onChange={(event) => onInputChange(event)} className={"editor"}>
                            </TextArea>
                        </Form>
                    </div>
                    <div>
                        <Header as={'h3'} floated={'left'}>
                            Contract Description
                        </Header>
                        <Form>
                            <TextArea
                                value={longDescription} name={"longDescription"} placeholder={contract.description}
                                onChange={(event) => setlongDescription(event.target.value)} className={"editor"}>
                            </TextArea>
                        </Form>
                    </div>
                    <h3>Contract Source</h3>
                    <GetSource id={contract.id}/>


                    <Button onClick={() => HnadleSubmit(contract)} className={'update-btn'}>Update Smart
                        Contract</Button>
                </Grid.Column>
            </Grid>
            }
        </section>
        </Layout>
    )
}

export default withAlert() (EditSmartContract);

