import React, { useState} from 'react';
import Layout from "../../../../hoc/Layout";
import '../../../../assets/scss/edit_smart_contract.css'
import {acceptedImageTypesArray, nameReg, numericReg} from "../../../ui/Helpers";
import {Button, Form, Grid, Header, Input, TextArea} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import CustomizedDialogs from "../../../ui/DialogBox";
import {useMutation, useQuery} from "@apollo/client";
import {contractById, editContract, imageUpload, sourceUpload} from "../../../../queries/queries";
import {Spinner2} from "../../../ui/Spinner";
import {Client} from "../../../../queries/Services";
import Avatar from "@material-ui/core/Avatar";
import {withAlert} from "react-alert";
import Uploader from "../../../ui/Uploader";
import GetSource from "./GetSource";


const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);
const EditSmartContract =(props)=> {
    const [cName,setcName]=useState("");
    const [fName,setfName]=useState("");
    const [cetagory,setCategory]=useState([]);
    const [newSource,setNewSource]=useState("");
    const [onePrice,setonePrice]=useState('');
    const [shortCounter,setshortCounter]=useState(200);
    const [uPrice,setuPrice]=useState("");
    const [img,setImg]=useState(null);
    const [imgPath,setImgPath]=useState("");
    const [imgModel,setimgModel]=useState(false);
    const [crop,setCrop]=useState({x: 0, y: 0, width: 300, height: 300, aspect: 1})
    const [imgRef,setImgRef]=useState();
    const [tags,setTag]=useState([]);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
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
    const handleChangeImage=(event)=>{
        const files = event.target.files
        const currentFile = files[0];
        if (event.target.files && event.target.files.length > 0) {
            const currentFileType = currentFile.type
            if (!acceptedImageTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
            }
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImg(reader.result),
                )
            setimgModel(true)
            reader.readAsDataURL(event.target.files[0]);
            event.target.value = '';
        }
    }
    const onImageLoad=(image)=>{
        setImgRef( image);
    }
    const onCropChange=(crop)=>{
        setCrop(crop)
    }
    const onCropComplete=(crop,pixelCrop)=>{
        setCrop(crop)
    }

    async function getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                resolve(blob);
            }, 'image/jpeg');
        });
    }

    async function  MakeClientCrop(crop) {
        if (crop.width && imgRef && crop.height) {
            const file = await getCroppedImg(
                imgRef,
                crop,
                'newFile.jpeg'
            );
             UploadImage(file)
           setCrop({x: 0, y: 0, width: 300, height: 300, aspect: 1})
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
    const handleSave=()=>{
        if (img!==null){
            setImg(null)
        }
       setimgModel(false)
        MakeClientCrop(crop);
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
        source({variables:{file}})
    }
    const RenderContractData=()=>{
        const {loading,error,data}=useQuery(contractById, {
            variables: {id: props.match.params.id},
            client: Client,
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        });
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        const contract=data.smartContractById
        console.log(contract)
        return  <Grid stretched columns={2} verticalAlign={'middle'}>
            <Grid.Column width={5}>
            <Form>
                <Form.Field>
                    <label>Contract Name</label>
                    <Input
                        type={'text'} placeholder={contract.contractName} name={'cName'}  value={cName}
                        onChange={(event)=>onInputChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label>Contract Category:</label>
                    <Select
                        components={makeAnimated()}
                        isMulti
                        size={'large'}
                        placeholder={contract.contractCategory}
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
                        name={"onePrice"} placeholder={contract.singleLicensePrice}
                        onChange={(event)=>onInputChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label >Unlimited License</label>
                    <Input
                        fluid size={'large'} value={uPrice}
                        label={{ basic: true, content: 'Dapps' }}
                        name={"uPrice"} placeholder={contract.unlimitedLicensePrice}
                        onChange={(event)=>onInputChange(event)}/>
                </Form.Field>
                <Form.Field>
                    <label>Contract Funcation Name</label>
                    <Input
                        type={'text'} placeholder={contract.sourceContractName} name={'fName'}  value={fName}
                        onChange={(event)=>onInputChange(event)}
                    />
                    <p className={"info"}>Name must be same  as contract Funcation name</p>
                </Form.Field>
                <Form.Field>
                    <label>Image</label>
                    <div className="wrapper">
                        <div className="file-upload">
                            <input type="file"  accept="image/jpeg,image/png" onChange={(event => handleChangeImage(event))} name={"img"}/>
                            <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                        </div>
                        <Avatar src={imgPath===""? contract.image:imgPath} style={{height:"120px",borderRadius:0,marginLeft:"10px" ,width:"120px"}} />
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
                            placeholder={tags.length>0?"":contract.tags}
                        />
                    </div>
                    <p className={"info"}>List of tags.Press enter to add tags</p>
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
                <Form>
                    <TextArea
                        value={shortDescription} placeholder={contract.shortDescription} name={"shortDescription"}
                        onChange={(event)=>onInputChange(event)} className={"editor"} >
                    </TextArea>
                </Form>
            </div>
            <div>
                <Header as={'h3'} floated={'left'}>
                    Contract Description
                </Header>
                <Form>
                    {/*<div className="container">*/}
                    {/*    <MEDitor height={200} value={longDescription} onChange={(event)=>setlongDescription(event)} />*/}
                    {/*    /!*<MEDitor.Markdown source={this.state.longDescription} />*!/*/}
                    {/*</div>*/}
                    <TextArea
                        value={longDescription} name={"longDescription"} placeholder={contract.description}
                        onChange={(event)=>setlongDescription(event.target.value)}  className={"editor"} >
                    </TextArea>
                </Form>
            </div>
            <h3>Contract Source</h3>
            <GetSource id={contract.id}/>
            <h3>Upload New Source</h3>
            <Uploader  type={'contract'} onSubmit={(file) => Submit(file)}/>

            <Button className={'update-btn'}>Update Smart Contract</Button>
        </Grid.Column>
    </Grid>
    }

    return (
        <Layout>
        <section className={'edit_contract'}>
            <h2>Edit Smart contract</h2>
            {RenderContractData()}
        </section>
            {imgModel?
                <CustomizedDialogs
                    crop={crop}
                    imageData={{disabled: false, locked: true}}
                    src={img}
                    onImageLoad={(image) => onImageLoad(image)}
                    onCropChange={(crop) => onCropChange(crop)}
                    onCropComplete={(crop, pixelCrop) => onCropComplete(crop, pixelCrop)}
                    handleSave={() => handleSave()}
                />:""
            }
        </Layout>
    );
}

export default withAlert() (EditSmartContract);

