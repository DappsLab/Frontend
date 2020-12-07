import React, { useState} from 'react';
import "../../../assets/scss/upload_smart_contract.css"
import {Divider} from "@material-ui/core";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Form, Grid, Input, TextArea, Header} from "semantic-ui-react"
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import CustomizedDialogs from "../../ui/DialogBox";
import {flowRight as compose} from "lodash";
import {
    createNewContract,
    imageUpload, me_Query,
    pendingSmartContract,
    sourceUpload
} from "../../../queries/queries";
import Layout from "../../../hoc/Layout";
import Uploader from "../../ui/Uploader";
import Checkbox from "@material-ui/core/Checkbox";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import {withAlert} from "react-alert";
import {Spinner} from "../../ui/Spinner";
import MEDitor from "@uiw/react-md-editor";
import {useMutation} from "@apollo/client";
import {Client} from "../../../queries/Services";
import {acceptedImageTypesArray, nameReg, numericReg} from "../../ui/Helpers";

const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);

const UploadSmartContract =(props)=>{
    const alert = props.alert;
    const [cName,setcName]=useState("");
    const [category,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [uPrice,setuPrice]=useState("");
    const [fileError,setFileError]=useState("");
    const [img,setImg]=useState(null);
    const [imgPath,setImgPath]=useState("");
    const [imgModel,setimgModel]=useState(false);
    const [crop,setCrop]=useState({x: 0, y: 0, width: 300, height: 300, aspect: 1})
    const [imgRef,setImgRef]=useState();
    const [shortCounter,setshortCounter]=useState(200);
    const [longCounter,setlongCounter]=useState(600);
    const [finalCategoryArray,setFinalCategoryArray]=useState([]);
    const [tags,setTag]=useState([]);
    const [contractError,setContractError]=useState("");
    const [checkError,setCheckError]=useState("")
    const [one,setOne]=useState(false);
    const [two,setTwo]=useState(false);
    const [uplaodLoading,setuplaodLoading]=useState(false);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [show,setshow]=useState(false);
    const [showAssocited,setshowAssocited]=useState(false);
    const [funcationName,setfuncationName]=useState("");
    const [sourcePath,setsourcePath]=useState("");

    //    image
    const  categoryOption=[
        {label: "TOOLS",value: "TOOLS"},
        {label: "FINANCIAL",value: "FINANCIAL"},
        {label: "DOCUMENTS",value: "DOCUMENTS"},
        {label: "UTILITY",value: "UTILITY"},
        {label: "SOCIAL",value: "SOCIAL"},
        {label: "ESCROW",value: "ESCROW"}
    ]

    const handleChange=(event)=>{
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
            case 'funcationName':
                setfuncationName(value);
                value===""&&setfuncationName("");
                break
            default:
                break
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
     const handleSaveContractData=()=>{
        if (isEmpty()) {
            setContractError("")
            setshowAssocited(true);
            for (let i = 0; i < category.length; i++) {
               finalCategoryArray.push(category[i]['value']);
            }
        }
    }
    const isEmpty=()=>{
        if ( cName.length !== 0 && tags.length !== 0 && category.length !== 0 && shortDescription.length !== 0 && longDescription.length !== 0 && onePrice.length !== 0 && imgPath.length !== 0 && uPrice.length !== 0){
            return true
        }else {
            setContractError("All Field Required");
            return false
        }
    }

    //image crop and update
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

    //Associated file
    const handleCheckbox=(event)=>{
        const {name,checked}=event.target;
        setCheckError("")
        switch (name){
            case 'one':
                setOne(checked)
                break;
            case 'two':
                setTwo(checked)
                break;
            default:
                break;
        }
    }
    const isEmptyCheckbox=()=>{
        console.log(one,two)
        if(one=== false|| two=== false){
           setCheckError("Both Required")
            return false
        }else {
            return true;
        }
    }
    const [source]=useMutation(sourceUpload,{
        client:Client,
        onCompleted:data1 => {
            console.log(data1)
            setsourcePath(data1.contractUploader);
            setshow(true)
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
        if (funcationName!=="") {
            source({variables:{file}})
            setFileError("");
        }else {
            setFileError("Both Fields Required")
        }
    }
    const renderReady=()=>(
        <div className={"attached_files flex files_ready"}>
            <h3>Ready rockstar?</h3>
            <Divider/>
            <p>There are just a few more things we need from you:</p>
            <div className={"radioBox flex"}>
                <div className={"radioInput flex"}>
                    <Checkbox
                        onChange={handleCheckbox}
                        color="primary"
                        name={"one"}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>I accept the term and condition</p>
                </div>
                <div className={"radioInput flex"}>
                    <Checkbox
                        name={"two"}
                        onChange={handleCheckbox}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>I own the rights to the content that will be published</p>
                </div>
            </div>
            {checkError.length>0?
                <span className={"errorMessage"}>Field Required</span>
            :""
            }
            <Button variant="contained"   onClick={HandlePublish} color="primary">Publish</Button>
        </div>
    )

    const [newContract]=useMutation(createNewContract,{
        client:Client,
        onCompleted:data => {
            console.log(data)
            props.history.push('/dashboard/developed_contract');
            setuplaodLoading(false)
        },
        onError:error => {
            setuplaodLoading(false)
            alert.error(error.toString(),{timeout:2000})
            console.log(error.toString())
        },
        refetchQueries:[{query:pendingSmartContract,context:{
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }},{query:me_Query,context:{
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
            if (isEmptyCheckbox()) {
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
                        unlimited: uPrice.toString(),
                        source: sourcePath.toString()
                    }
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
    return  uplaodLoading?<Spinner/>: (
        <Layout>
            <Grid textAlign="center"  verticalAlign='middle' >
                <Grid.Column style={{maxWidth:1355}}>
                    <Grid.Row className={"upload_bg"}>
                        <h2><strong>Publish new  Smart Contract</strong></h2>
                        <h3>General Info</h3>
                    </Grid.Row>
                    <Grid.Row>
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
                        <div className={"generalContainer"}>
                            <div className={"generalDescription flex"}>
                                <div>Upload the general information about your contract code (description,pricing,etc)</div>
                                <Link to={""} className={"cursor"}>Download user guiding for adding a smart contract</Link>
                            </div>
                            {contractError.length>0&&<span style={{top:"0"}} className={"errorMessage"}>
                                {contractError}
                            </span>}
                            <div className={"generalMain flex"}>
                                <div className={"generalLeft"}>
                                    <Form>
                                        <Fade top delay={300}>
                                            <Form.Field>
                                                <label>Contract Name:</label>
                                                <Input
                                                    type={'text'}
                                                    value={cName} name={"cName"}
                                                    onChange={(event)=>handleChange(event)}/>
                                                    <p className={"info"}>This will show in the list as the title</p>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Contract Category:</label>
                                                <Select
                                                    components={makeAnimated()}
                                                    isMulti
                                                    size={'large'}
                                                    value={category}
                                                    onChange={(value)=>{setCategory(value)}}
                                                    name="contractCategory"
                                                    options={categoryOption}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                                <p className={"info"}>What categories suits your contract</p>
                                                <Form.Field>
                                                    <label >Price per License</label>
                                                    <Input
                                                        fluid size={'large'} value={onePrice}
                                                        label={{ basic: true, content: 'Dapps' }}
                                                        name={"onePrice"}
                                                        onChange={(event)=>handleChange(event)}/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Unlimited License</label>
                                                    <Input
                                                        fluid size={'large'} value={uPrice}
                                                        label={{ basic: true, content: 'Dapps' }}
                                                        name={"uPrice"}
                                                        onChange={(event)=>handleChange(event)}/>
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
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Image</label>
                                                <div className="wrapper">
                                                    <div className="file-upload">
                                                        <input type="file"  accept="image/jpeg,image/png" onChange={(event )=> handleChangeImage(event)} name={"img"}/>
                                                        <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                                                    </div>
                                                </div>
                                            </Form.Field>
                                        </Fade>
                                    </Form>
                                </div>
                                <Divider orientation="vertical" flexItem />
                                <div className={"generalRight"}>
                                    <Fade top delay={300}>
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
                                    <Fade bottom delay={500}>
                                        <Header as={'h3'} floated={'left'}>
                                            Contract Description
                                        </Header>
                                        <Header as={'span'} floated={'right'}>
                                            Characters left: {longCounter}
                                        </Header>
                                        <Form>
                                            <div className="container">
                                                <MEDitor height={200} value={longDescription} onChange={(event)=>setlongDescription(event)} />
                                                {/*<MEDitor.Markdown source={this.state.longDescription} />*/}
                                            </div>
                                            {/*<TextArea*/}
                                            {/*    value={longDescription} name={"longDescription"}*/}
                                            {/*    onChange={this.handleChange} className={"editor"} >*/}
                                            {/*</TextArea>*/}
                                            {/*{formErrors.longDescription.length>0&&(*/}
                                            {/*    <span className={"errorMessage"}>{formErrors.longDescription}</span>*/}
                                            {/*)}*/}
                                        </Form>
                                    </Fade>
                                    <Button disabled={showAssocited} onClick={handleSaveContractData} className={"btnsave"} >Save</Button>
                                </div>
                            </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        {showAssocited&&
                        <Fade bottom delay={400}>
                            <div className={"attached_files"}>
                                <h3>Associated Files</h3>
                                {fileError.length>0&&<span style={{top:"0"}} className={"errorMessage"}>
                                {fileError}
                            </span>}
                                {/*{fNameError.length>0&&(*/}
                                {/*    <span className={"errorMessage"}>{fNameError}</span>*/}
                                {/*)}*/}
                                <Grid columns={2} divided>
                                    <Grid.Column>
                                        <Uploader onSubmit={(files) => Submit(files)}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form>
                                            <Form.Field>
                                                <label>Contract Funcation Name</label>
                                                <Form.Input
                                                    fluid type={'text'} name={'funcationName'} onChange={(event)=>handleChange(event)}
                                                    value={funcationName}
                                                />
                                                <p className={'info'}>Enter the Exact  Name of funcation Which you used in Contract </p>
                                            </Form.Field>
                                        </Form>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </Fade>
                        }
                        {show ?
                            renderReady()
                            : null
                        }
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Layout>
    );
}

export default  compose(withAlert(),)(UploadSmartContract);
