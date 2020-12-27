import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import {categoryOption, nameReg, numericReg} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import '../../../../assets/scss/edit_smart_contract.css'
import {
    createDapps,
    dappsFile,
    getDapps,
    imageUpload, me_Query,

} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Form, Button,Grid, Header, Input, TextArea} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import {withAlert} from "react-alert";
import Uploader from "../../../ui/Uploader";
import {Spinner2} from "../../../ui/Spinner";
import ReactMarkdown from "react-markdown";
import UploadImage from "../../uploadContract/contractCompoent/UploadImage";
import Tags from "../../uploadContract/contractCompoent/Tags";

const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);
const UploadDapps = (props) => {
    const [cName,setcName]=useState("");
    const [category,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [imgPath,setImgPath]=useState("");
    const [tags,setTag]=useState([]);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [sourcePath,setsourcePath]=useState("");
    const [shortCounter,setshortCounter]=useState(200);
    const [loading,setLoading]=useState(false);

    const alert=props.alert;
    const onInputChange=(event)=>{
        event.preventDefault();
        const {name,value}=event.target;
        switch (name){
            case 'cName':
                nameReg.test(value)&& setcName(value);
                value===""&&setcName("");
                break;
            case 'onePrice':
                numericReg.test(value)&&setonePrice(value);
                value===""&&setonePrice("");
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
    const [createDapp]=useMutation(createDapps,{
        client:Client,
        onCompleted:data => {
            setLoading(false);
            alert.success("Upload SUccessfully" ,{timeout:2000})
            props.history.push('/dashboard/developed_dapps')
        },onError:error => {
            alert.error(error.toString(),{timeout:2000})
            setLoading(false)
        },context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        refetchQueries:[{query:getDapps,context:{
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }},{query:me_Query,context:{
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }}],
    })
    const UploadDapp=()=>{
        if (isEmpty()) {
            setLoading(true)
            let finalCategoryArray = [];
            for (let i = 0; i < category.length; i++) {
                finalCategoryArray.push(category[i]['value']);
            }

            createDapp({
                variables: {
                    name: cName.toString(),
                    image: imgPath,
                    tags: tags,
                    category: finalCategoryArray,
                    short: shortDescription.toString(),
                    desc: longDescription.toString(),
                    price: onePrice.toString(),
                    zip: sourcePath
                }
            }).catch(errors => {
                alert.error(errors.toString(), {timeout: 2000})
            })
        }
    }
    const [source]=useMutation(dappsFile,{
        client:Client,
        onCompleted:data1 => {
           alert.success("Source Uploaded")
            setsourcePath(data1.dAppUploader)
        },onError:error => {
        alert.error(error.toString(),{timeout:2000})
        },
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
    })
    const isEmpty=()=>{
       if (cName.length>0&&imgPath.length>0&&tags.length>0,category.length>0,shortDescription.length>0,longDescription.length>0,onePrice.length>0){
            return true
        }else {
            alert.error("all fields Required",{timeout:2000})
            return false
        }
    }

    const Submit=(file)=>{
        source({variables:{file}}).catch(err=>{
            alert.error(err.toString(),{timeout:2000})
        })
    }
    return (
        <Layout>
            <section className={'generalContainer edit_dapp'}>

                {loading ? <Spinner2/> :
                    <Grid stretched columns={2} verticalAlign={'middle'}>
                        <Grid.Column width={5}>
                            <Form>
                                <Form.Field>
                                    <label>Dapps Name</label>
                                    <Input
                                        type={'text'} name={'cName'} value={cName}
                                        onChange={(event) => onInputChange(event)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Dapps Category:</label>
                                    <Select
                                        components={makeAnimated()}
                                        isMulti
                                        size={'large'}
                                        value={category}
                                        onChange={(value) => setCategory(value)}
                                        name="contractCategory"
                                        options={categoryOption}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Price of Dapps</label>
                                    <Input
                                        fluid size={'large'} value={onePrice}
                                        label={{basic: true, content: 'Dapps'}}
                                        name={"onePrice"}
                                        onChange={(event) => onInputChange(event)}/>
                                </Form.Field>
                                <UploadImage imgPath={imgPath} setImgPath={setImgPath}/>
                                <Tags tags={tags} setTag={setTag}/>
                                <Form.Field>
                                    <label>Upload  Source</label>
                                    <Uploader className={"file_upload"} type={'dapps'} onSubmit={(file) => Submit(file)}/>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <h1>Upload Dapps</h1>
                            <div>
                                <Header as={'h3'} floated={'left'}>
                                    Short Description
                                </Header>
                                <Header as={'span'} floated={'right'}>
                                    Characters left: {shortCounter}
                                </Header>
                            </div>
                            <Form>
                                <TextArea
                                    value={shortDescription} name={"shortDescription"}
                                    onChange={(event) => onInputChange(event)} className={"editor"}>
                                </TextArea>
                            </Form>
                            <Header as={'h3'} floated={'left'}>
                                Dapp Description
                            </Header>
                            <Form>
                                <Form.Field className={'longDesc flex'}>
                                    <TextArea
                                        value={longDescription} name={"longDescription"}
                                        onChange={(event)=>setlongDescription(event.target.value)} className={"editor"} >
                                    </TextArea>
                                    <ReactMarkdown source={longDescription} className={'markdown'}/>
                                </Form.Field>
                                <Button disabled={sourcePath===''&&true} className={'update-btn'} onClick={()=>UploadDapp()}>Uplaod Dapp</Button>
                            </Form>

                        </Grid.Column>
                    </Grid>

                }
            </section>
        </Layout>
    );
};

export default withAlert()(UploadDapps);
