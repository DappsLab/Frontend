import React, { useState} from 'react';
import Layout from "../../../../hoc/Layout";
import '../../../../assets/scss/edit_smart_contract.css'
import {Button, Form, Grid, Header, TextArea} from "semantic-ui-react";
import {useMutation, useQuery} from "@apollo/client";
import {contractById, editContract, testVersion, me_Query, sourceUpload} from "../../../../queries/queries";
import {Spinner2} from "../../../ui/Spinner";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import Uploader from "../../../ui/Uploader";
import {GetSource} from "./GetSource";
import GetVersion from "../GetVersion";
import UploadImage from "../contractCompoent/UploadImage";
import Tags from "../contractCompoent/Tags";
import {
    ContractCategory,
    ContractName,
    FuncationName,
    OneLicense,
    UnlimitedLicense
} from "../contractCompoent/ContractFileds";
import ReactMarkdown from "react-markdown";


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
    const {alert,user}=props;



    const onInputChange=(event)=>{
        event.preventDefault();
        const {name,value}=event.target;
        switch (name){
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


    const [source]=useMutation(sourceUpload,{
        client:Client,
        onCompleted:data1 => {
            console.log(data1)
            setNewSource(data1.contractUploader);
            alert.success("UPLOAD Source")
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
    const onContractVersion=(event)=>{
        const {value}=event.target;
        if (value==="select"){
            setVersion('')
        }else {
            setVersion(value)
        }
    }
    const [version_test]=useMutation(testVersion,{
        client:Client,context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onCompleted:data1 => {
            if (data1.testCompiledContractVersion.abi){
                alert.success("Successful Compiled With this version")
            }else {
                alert.error(data1.testCompiledContractVersion.error,{timeout:3000})
            }
    },onError:error1 => {
        alert.error(error1.toString(),{timeout:3000})
    }
    })
    const onVersionTest=(contract)=>{
        version_test({
            variables:{
                id:contract.id,
                version:version
            }
        }).catch(err=>{
            console.log(err.toString())
        })
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
                const contractData=data1.smartContractById;
                setshortDescription(contractData.shortDescription)
                setlongDescription(contractData.description)
            },onError:error1 => {
                alert.error(error1.toString(),{timeout:3000})
            }
        });
        if (loading) return <Spinner2/>
        if (error) return <p>{error.toString()}</p>
        if (data){
            return <div> </div>
        }
    }
    return (
        <Layout>
        <section className={'edit_contract generalContainer'}>
            {RenderContractData()}
            {contract &&
            <Grid stretched columns={2} verticalAlign={'middle'}>
                <Grid.Column width={5}>
                    <Form>
                        <ContractName cName={cName} contract={contract} setcName={setcName}/>
                        <ContractCategory category={cetagory} contract={contract} setCategory={setCategory}/>
                        <OneLicense onePrice={onePrice} contract={contract} setonePrice={setonePrice}/>
                        <UnlimitedLicense uPrice={uPrice} contract={contract} setuPrice={setuPrice}/>
                        <Tags tags={tags} setTag={setTag} contract={contract}/>
                        <UploadImage imgPath={imgPath===''?contract.image:imgPath} setImgPath={setImgPath} />
                        <FuncationName contract={contract} funcationName={fName} setfuncationName={setfName} />
                        <Form.Field>
                            <label>Upload New Source</label>
                            <Uploader type={'contract'} onSubmit={(file) => Submit(file)}/>
                        </Form.Field>
                    </Form>
                    <GetVersion value={contract.compilerVersion} onContractVersion={(event) => onContractVersion(event)}/>
                    {user.type==="ADMIN"&&
                        <div>
                        <Button onClick={()=>onVersionTest(contract)} className={'compilebtn'}>Compile Test</Button>
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
                                value={shortDescription}
                                // placeholder={contract.shortDescription}
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
                            <Form.Field className={'longDesc flex'}>
                                <TextArea
                                    value={longDescription} name={"longDescription"}
                                    // placeholder={contract.description}
                                    onChange={(event)=>setlongDescription(event.target.value)} className={"editor"} >
                                </TextArea>
                                <ReactMarkdown source={longDescription===""?contract.description:longDescription} className={'markdown'}/>
                            </Form.Field>
                        </Form>
                    </div>
                    <h3>Contract Source</h3>
                    <GetSource id={contract.id}/>
                    <Button loading={Loading} onClick={() => HnadleSubmit(contract)} className={'update-btn'}>Update Smart Contract</Button>
                </Grid.Column>
            </Grid>
            }
        </section>
        </Layout>
    )
}

export default withAlert() (EditSmartContract);

