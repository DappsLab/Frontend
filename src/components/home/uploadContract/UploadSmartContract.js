import React, { useState} from 'react';
import "../../../assets/scss/upload_smart_contract.css"
import {Divider} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Form, Grid, TextArea, Header} from "semantic-ui-react"
import Button from "@material-ui/core/Button";
import {flowRight as compose} from "lodash";
import {
    createNewContract, me_Query,
    sourceUpload
} from "../../../queries/queries";
import Layout from "../../../hoc/Layout";
import Uploader from "../../ui/Uploader";
import {withAlert} from "react-alert";
import { Spinner2} from "../../ui/Spinner";
import ReactMarkdown from 'react-markdown'
import {useMutation} from "@apollo/client";
import {Client} from "../../../queries/Services";
import GetVersion from "./GetVersion";
import UploadImage from "./contractCompoent/UploadImage";
import Tags from "./contractCompoent/Tags";
import {
    ContractCategory,
    ContractName,
    FuncationName,
    OneLicense,
    UnlimitedLicense
} from "./contractCompoent/ContractFileds";
import {Link} from "react-router-dom";

const descriptionRGP=RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s,.]*$/);

const UploadSmartContract =(props)=>{
    const [cName,setcName]=useState("");
    const [category,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [uPrice,setuPrice]=useState("");
    const [active,setActive]=useState(true);
    const [imgPath,setImgPath]=useState("");
    const [shortCounter,setshortCounter]=useState(200);
    const [tags,setTag]=useState([]);
    const [uplaodLoading,setuplaodLoading]=useState(false);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [showAssocited,setshowAssocited]=useState(false);
    const [funcationName,setfuncationName]=useState("");
    const [sourcePath,setsourcePath]=useState("");
    const [version,setVersion]=useState("");
    const [finalCategoryArray,setfinalCategoryArray]=useState([])

    const {alert}=props


    const handleChange=(event)=>{
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


     const handleSaveContractData=()=>{
        if (isEmpty()) {
            setshowAssocited(true);
            for (let i = 0; i < category.length; i++) {
               finalCategoryArray.push(category[i]['value']);
            }
            console.log(finalCategoryArray)
        }
    }
    const isEmpty=()=>{
        if ( cName.length !== 0 && tags.length !== 0 && category.length !== 0 && shortDescription.length !== 0 && longDescription.length !== 0 && onePrice.length !== 0 && imgPath.length !== 0 && uPrice.length !== 0){
            return true
        }else {
            alert.error("ALl Fields Required",{timeout:3000})
            return false
        }
    }




    const [source]=useMutation(sourceUpload,{
        client:Client,
        onCompleted:data1 => {
            setsourcePath(data1.contractUploader);
            alert.success("Source Uploaded",{timeout:1000})
            setActive(false)
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

    const [newContract]=useMutation(createNewContract,{
        client:Client,
        onCompleted:data => {
            console.log(data)
            setfinalCategoryArray([])
            props.history.push('/dashboard/developed_contract');
            setuplaodLoading(false)
        },
        onError:error => {
            setuplaodLoading(false)
            alert.error(error.toString(),{timeout:2000})
            console.log(error.toString())
        },
        refetchQueries:[{query:me_Query,context:{
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }}],
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },

    });
    const HandlePublish=()=> {
        if (isEmpty()) {
            if (funcationName!==""&&version!=='') {
                setuplaodLoading(true);
                newContract({
                    variables: {
                        fname: funcationName,
                        name: cName,
                        image: imgPath,
                        short: shortDescription,
                        category: finalCategoryArray,
                        long: longDescription,
                        one: onePrice,
                        tags: tags,
                        version:version,
                        unlimited: uPrice.toString(),
                        source: sourcePath.toString()
                    }
                }).catch(error=>{
                    console.log(error.toString())
                })
            }
        }
        //                 showAssocited:false,
        //                 funcationName:"",shortDescription:"",
        //                 longDescription:"",
        //                 contractName:"",
        //                 contractCategory:[],
        //                 finalCategoryArray:[],
        //                 onePrice:"",
        //                 unlimitedPrice:"",
        //                 tags:[],
        //                 one:false,
        //                 two:false,
    }
    const onContractVersion=(event)=>{
        const {value}=event.target;
        if (value==="select"){
            setVersion('')
        }else {
            setVersion(value)
        }
    }
    return  (
        <Layout>
            {uplaodLoading&&<Spinner2/>}
            <Grid textAlign="center"  verticalAlign='middle' >
                <Grid.Column>
                    <Grid.Row>
                        <div className={"generalContainer"}>
                            <div className={"generalMain flex"}>
                                <div className={"generalLeft"}>
                                    <span className={'desc'}>Upload the general information about your contract code (description,pricing,etc)</span>
                                    <Form>
                                        <ContractName cName={cName} setcName={setcName}/>
                                        <ContractCategory category={category} setCategory={setCategory}/>
                                        <OneLicense onePrice={onePrice} setonePrice={setonePrice}/>
                                        <UnlimitedLicense uPrice={uPrice} setuPrice={setuPrice}/>
                                        <Tags tags={tags} setTag={setTag}/>
                                        <UploadImage imgPath={imgPath} setImgPath={setImgPath}/>
                                    </Form>
                                </div>
                                <Divider orientation="vertical" flexItem />
                                <div className={"generalRight"}>
                                    <h1>Publish New  Smart Contract</h1>
                                   <div className={'guiding'}>
                                       <Link  to={'#'}>Downlaod User Guiding For Adding a Smart Contract</Link>
                                   </div>
                                    <Fade right delay={300}>
                                        <Header as={'h3'} floated={'left'}>
                                            Short Description
                                        </Header>
                                        <Header as={'span'} floated={'right'}>
                                            Characters left: {shortCounter}
                                        </Header>
                                        <Form>
                                            <TextArea
                                                value={shortDescription} name={"shortDescription"}
                                                onChange={(event)=>handleChange(event)} className={"editor"} >
                                            </TextArea>
                                        </Form>
                                    </Fade>
                                    <Fade right delay={500}>
                                        <Header as={'h3'} floated={'left'}>
                                            Contract Description
                                        </Header>
                                        <Form>
                                            <Form.Field className={'longDesc flex'}>
                                                <TextArea
                                                    value={longDescription} name={"longDescription"}
                                                    onChange={(event)=>setlongDescription(event.target.value)} className={"editor"} >
                                                </TextArea>
                                                <ReactMarkdown source={longDescription} className={'markdown'}/>
                                            </Form.Field>
                                        </Form>
                                    </Fade>
                                    <Button disabled={showAssocited}  onClick={handleSaveContractData} className={"publishbtn"} >Save</Button>

                                    {showAssocited&&
                                    <Fade top>
                                        <div className={"attached_files"}>
                                            <h1>Associated Files</h1>
                                            <Uploader type={'contract'} onSubmit={(file) => Submit(file)}/>
                                            <Form>
                                                <FuncationName funcationName={funcationName} setfuncationName={setfuncationName} />
                                            </Form>
                                            <GetVersion onContractVersion={(event)=>onContractVersion(event)}/>
                                            <Button variant="contained" className={'publishbtn'} disabled={active}   onClick={()=>HandlePublish()} color="primary">Publish</Button>
                                        </div>
                                    </Fade>
                                    }
                                </div>
                            </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row>

                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Layout>
    );
}

export default  compose(withAlert(),)(UploadSmartContract);
