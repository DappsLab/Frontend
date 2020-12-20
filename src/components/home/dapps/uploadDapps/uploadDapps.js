import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import { nameReg, numericReg} from "../../../ui/Helpers";
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

import MEDitor from "@uiw/react-md-editor";
import Uploader from "../../../ui/Uploader";
import {Spinner2} from "../../../ui/Spinner";

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
    const [error,setError]=useState("");
    const  categoryOption=[
        {label: "TOOLS",value: "TOOLS"},
        {label: "FINANCIAL",value: "FINANCIAL"},
        {label: "DOCUMENTS",value: "DOCUMENTS"},
        {label: "UTILITY",value: "UTILITY"},
        {label: "SOCIAL",value: "SOCIAL"},
        {label: "ESCROW",value: "ESCROW"}
    ]
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
    const handleChangeImage=(event)=> {
        const files = event.target.files
        const currentFile = files[0];
        if (currentFile){
            UploadImage(currentFile);
            event.target.value = '';
        }
    }
    const [upload]=useMutation(imageUpload,{
        client:Client,
        onCompleted:data1 => {
            setImgPath(data1.imageUploader);
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:2000})
            console.log(error1.toString())
        }
    });
    const UploadImage=(file)=>{
        upload({variables: {file}});
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
    const [source]=useMutation(dappsFile,{
        client:Client,
        onCompleted:data1 => {
            let finalCategoryArray=[];
            for (let i = 0; i < category.length; i++) {
                finalCategoryArray.push(category[i]['value']);
            }
            setsourcePath(data1.dAppUploader);
            console.log(sourcePath)
            createDapp({
                variables:{
                    name:cName.toString(),
                    image:imgPath,
                    tags:tags,
                    category:finalCategoryArray,
                    short:shortDescription.toString(),
                    desc:longDescription.toString(),
                    price:onePrice.toString(),
                    zip:data1.dAppUploader
                }
            }).catch(errors=>{
                alert.error(errors.toString(),{timeout:2000})
            })
        },onError:error => {
        alert.error(error.toString(),{timeout:2000})
        setLoading(false)
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
            setError("all fields Required")
            return false
        }
    }

    const Submit=(file)=>{
        if (isEmpty()){
            setError("")
            setLoading(true)
            source({variables:{file}}).catch(err=>{
                alert.error(err.toString(),{timeout:2000})
            })
        }
    }
    return (
        <Layout>
            <section className={'edit_dapp'}>
           <h2>Upload Dapps</h2>
                {loading ? <Spinner2/> :
                    <div>
                        {error.length>0&&<span className={'errorMessage'}>{error}</span>}
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
                                <Form.Field>
                                    <label>Image</label>
                                    <div className="wrapper">
                                        <div className="file-upload">
                                            <input type="file" accept="image/jpeg,image/png"
                                                   onChange={(event => handleChangeImage(event))} name={"img"}/>
                                            <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                                        </div>
                                        {imgPath.length > 0 &&
                                        <Avatar
                                            src={imgPath}
                                            style={{
                                                height: "120px",
                                                borderRadius: 0,
                                                marginLeft: "10px",
                                                width: "120px"
                                            }}/>
                                        }
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <label>Dapps Tag:</label>
                                    <div className="tags-input">
                                        <ul id="tags">
                                            {tags.map((tag, index) => (
                                                <li key={index} className="tag">
                                                    <span className='tag-title'>{tag}</span>
                                                    <span className='tag-close-icon'
                                                          onClick={() => removeTags(index)}
                                                    >x</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <input
                                            type="text"
                                            onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                                            placeholder="Press enter to add tags"
                                        />
                                    </div>
                                    <p className={"info"}>List of tags</p>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={11}>
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
                                Contract Description
                            </Header>
                            <Form>
                                <div className="container">
                                    <MEDitor height={200} value={longDescription}
                                             onChange={(event) => setlongDescription(event)}/>
                                    {/*<MEDitor.Markdown source={this.state.longDescription} />*/}
                                </div>
                            </Form>
                        </Grid.Column>
                    </Grid>
                    <Uploader className={"file_upload"} type={'dapps'} onSubmit={(file) => Submit(file)}/>
                    </div>
                }
            </section>
        </Layout>
    );
};

export default withAlert()(UploadDapps);
