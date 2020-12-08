import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import { nameReg, numericReg} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import '../../../../assets/scss/edit_smart_contract.css'
import {dappsFile, imageUpload, sourceUpload} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Form, Grid, Header, Input, TextArea} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import {withAlert} from "react-alert";

import MEDitor from "@uiw/react-md-editor";
import Uploader from "../../../ui/Uploader";

const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);
const UploadDapps = (props) => {
    const [cName,setcName]=useState("");
    const [cetagory,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [imgPath,setImgPath]=useState("");
    const [tags,setTag]=useState([]);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [sourcePath,setsourcePath]=useState("");
    const [shortCounter,setshortCounter]=useState(200);
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
    const [source]=useMutation(dappsFile,{
        client:Client,
        onCompleted:data1 => {
            setsourcePath(data1.dAppUploader);
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
    const Submit=(files)=>{
        const file=files[0].file;
        source({variables:{file}})

    }
    return (
        <Layout>
            <section className={'edit_contract'}>
           <h2>Upload Dapps</h2>
            <Grid stretched columns={2} verticalAlign={'middle'}>
                <Grid.Column width={5}>
                    <Form>
                        <Form.Field>
                            <label>Contract Name</label>
                            <Input
                                type={'text'} name={'cName'}  value={cName}
                                onChange={(event)=>onInputChange(event)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Contract Category:</label>
                            <Select
                                components={makeAnimated()}
                                isMulti
                                size={'large'}
                                value={cetagory}
                                onChange={(value)=>setCategory(value)}
                                name="contractCategory"
                                options={categoryOption}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label >Price per License</label>
                            <Input
                                fluid size={'large'} value={onePrice}
                                label={{ basic: true, content: 'Dapps' }}
                                name={"onePrice"}
                                onChange={(event)=>onInputChange(event)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Image</label>
                            <div className="wrapper">
                                <div className="file-upload">
                                    <input type="file"  accept="image/jpeg,image/png" onChange={(event => handleChangeImage(event))} name={"img"}/>
                                    <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                                </div>
                                {console.log(imgPath)}
                                {imgPath.length > 0 &&
                                     <Avatar
                                         src={imgPath}
                                        style={{height: "120px",borderRadius:0, marginLeft: "10px", width: "120px"}}/>
                                }
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <label>Tag:</label>
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
                    <Header as={'h3'} floated={'left'}>
                        Short Description
                    </Header>
                    <Header as={'span'} floated={'right'}>
                        Characters left: {shortCounter}
                    </Header>
                    <Form>
                        <TextArea
                            value={shortDescription} name={"shortDescription"}
                            onChange={(event)=>onInputChange(event)} className={"editor"} >
                        </TextArea>
                    </Form>
                    <Header as={'h3'} floated={'left'}>
                        Contract Description
                    </Header>
                    <Form>
                        <div className="container">
                            <MEDitor height={200} value={longDescription} onChange={(event)=>setlongDescription(event)} />
                            {/*<MEDitor.Markdown source={this.state.longDescription} />*/}
                        </div>
                    </Form>
                </Grid.Column>
            </Grid>
                <Uploader type={'dapps'} onSubmit={(files) => Submit(files)}/>
            </section>
        </Layout>
    );
};

export default withAlert()(UploadDapps);
