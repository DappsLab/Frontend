import React, {Component} from 'react';
import "../../../assets/scss/upload_smart_contract.css"
import {Divider} from "@material-ui/core";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";
import {Form, Grid, Input, TextArea} from "semantic-ui-react"
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import CustomizedDialogs from "../../ui/DialogBox";
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import {createNewContract, getContract, imageUpload, sourceUpload} from "../../../queries/queries";
import Layout from "../../../hoc/Layout";
import Uploader from "../../ui/Uploader";
import Checkbox from "@material-ui/core/Checkbox";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import {withAlert} from "react-alert";
import Spinner from "../../ui/Spinner";
;


const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});
const contractname=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
const numeric=RegExp(/^[0-9\s]*$/);

class UploadSmartContract extends Component{
    state= {
        shortDescription:"",
        longDescription:"",
        contractName:"",
        contractCategory:[],
        finalCategoryArray:[],
        onePrice:"",
        unlimitedPrice:"",
        tag:"",
        checkBox:"",
        loading:false,
        formErrors:{
            contractName:"",
            contractCategory:"",
            shortDescription:"",
            longDescription:"",
            onePrice:"",
            unlimitedPrice:"",
            tag:"",
            check1:"",
            check2:"",
            sourcePath:"",
            imageFinalPath:""
        },
    //    image
        imageSrc: null,
        crop: {
            x:0,
            y:0,
            width: 300,
            height: 300,
            aspect: 1
        },
        imageData: {
            disabled: false,
            locked: true,
        },
        showDialog: false,
        imageFinalPath:"",
    //associated file
        show:true,
        showAssocited:true,
        sourcePath:"",
     }
    categoryOption=[
        {label: "TOOLS",value: "TOOLS"},
        {label: "FINANCIAL",value: "FINANCIAL"},
        {label: "DOCUMENTS",value: "DOCUMENTS"},
        {label: "UTILITY",value: "UTILITY"},
        {label: "SOCIAL",value: "SOCIAL"},
        {label: "ESCROW",value: "ESCROW"}
    ]


    handleChange=(event)=>{
        const {name,value}=event.target;
        const {formErrors}=this.state;
        switch (name){
            case "contractName":
                formErrors.contractName= contractname.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            case "onePrice":
                formErrors.onePrice= numeric.test(value)
                    ? ""
                    :"Only Integer Allowed";
                break;
            case "unlimitedPrice":
                formErrors.unlimitedPrice= numeric.test(value)
                    ? ""
                    :"Only Integer Allowed";
                break;
            case "tag":
                formErrors.tag= contractname.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            case "longDescription":
                formErrors.longDescription= contractname.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            case "shortDescription":
                formErrors.shortDescription= contractname.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            default:
                break
        }
        this.setState({formErrors,[name]:value},()=>{});
    }
    handleSaveContractData=()=>{
        const {contractCategory,finalCategoryArray}=this.state;
        if (this.isEmpty(this.state)) {
            this.setState({showAssocited: true});
            for (let i = 0; i < contractCategory.length; i++) {
               finalCategoryArray.push(contractCategory[i]['value']);
            }
        }
    }
    isEmpty=({contractName,contractCategory,imageFinalPath,unlimitedPrice,longDescription,shortDescription,onePrice,tag,formErrors})=>{
        if (contractName.length!==0&&tag.length!==0&&contractCategory.length!==0&&shortDescription.length!==0&&longDescription.length!==0&&onePrice.length!==0&&imageFinalPath.length!==0&&unlimitedPrice.length!==0){
            return true;
        }else {
            if (contractName === "") {formErrors.contractName = "Field Required"}
            if (tag === "") {formErrors.tag = "Field Required"}
            if (onePrice === "") {formErrors.onePrice = "Field Required"}
            if (shortDescription === "") {formErrors.shortDescription = "Field Required"}
            if (longDescription === "") {formErrors.longDescription = "Field Required"}
            if (unlimitedPrice === "") {formErrors.unlimitedPrice = "Field Required"}
            if (imageFinalPath === "") {formErrors.imageFinalPath = "Field Required"}
            if (contractCategory.length === 0) {formErrors.contractCategory = "Field Required"}
            this.setState({formErrors})
            return false;
        }
    }
    handelCategory=(value)=>{
        const {formErrors}=this.state;
        formErrors.contractCategory="";
       this.setState({formErrors,contractCategory:value})
    }

    //image crop and update

    handleChangeImage=(event)=>{
        const files = event.target.files
        const currentFile = files[0];
        console.log(event.target.files);
        if (event.target.files && event.target.files.length > 0) {
            const currentFileType = currentFile.type
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
            }
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({imageSrc: reader.result, showDialog: true},()=>{
                    console.log(this.state.showDialog)
                })
            )
            reader.readAsDataURL(event.target.files[0]);
            event.target.value = '';
        }
    }
    removeImage=()=>{
        this.setState({imageFinalPath:""})
    }
    onImageLoad=(image)=>{
        this.imageRef = image;
    }
    onCropChange=(crop)=>{
        this.setState({ crop });
    }
    onCropComplete=(crop,pixelCrop)=>{
        this.setState({ crop });
    }
    handleSave=()=>{
        if (this.state.imageSrc!==null){
            this.setState({imageSrc:null})
        }
        this.setState({showDialog:false})
        this.makeClientCrop(this.state.crop);
    }
    async makeClientCrop(crop) {
        const that = this;
        if (crop.width && this.imageRef && crop.height) {
            const file = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ file });
            this.props.uploadImage({variables:{file}}).then(function(result) {
                that.setState({imageFinalPath:result.data.imageUploader})
            });
            const newCrop={...this.state.crop}
            newCrop.x=0;
            newCrop.y=0;
            this.setState({crop:newCrop})
        }
    }
    getCroppedImg(image, crop, fileName) {
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
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(blob);
            }, 'image/jpeg');
        });
    }

    //Associated file
    handleCheckbox=(event)=>{
        const {name,checked}=event.target;
        let formErrors=this.state.formErrors;
        switch (name){
            case 'one':
                formErrors.check1=checked;
                break;
            case 'two':
                formErrors.check2=checked;
                break;
            default:
                break;
        }
    }
    // isValidCheckbox=(checkBox)=>{
    //     return checkbox.check1 === true && checkbox.check2 === true;
    // };
    submit=(files)=>{
        const file=files[0].file;
        const  that =this;
        this.props.sourceUpload({variables:{file}}).then(function(result) {
            that.setState({sourcePath:result.data.contractUploader})
        }).then(result=>{}).catch(error=>{
            console.log(error);
        });
        this.setState({show:!this.state.show})
    }
    renderReady=()=>(
        <div className={"attached_files flex files_ready"}>
            <h3>Ready rockstar?</h3>
            <Divider/>
            <p>There are just a few more things we need from you:</p>
            <div className={"radioBox flex"}>
                <div className={"radioInput flex"}>
                    <Checkbox
                        onChange={this.handleCheckbox}
                        color="primary"
                        name={"one"}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>I accept the term and condition</p>
                </div>
                <div className={"radioInput flex"}>
                    <Checkbox
                        name={"two"}
                        onChange={this.handleCheckbox}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>I own the rights to the content that will be published</p>
                </div>
            </div>
            <Button variant="contained" onClick={this.handlePublish} color="primary">Publish</Button>
        </div>
    )
    // isEmptySource=({sourcePath})=>{
    //     const {formErrors}=this.state;
    //     if (sourcePath!==""){
    //         return true;
    //     }else {
    //         if (sourcePath === "") {formErrors.sourcePath = "Field Required"}
    //         // if (onePrice === "") {formErrors.onePrice = "Field Required"}
    //         this.setState({formErrors})
    //         return false;
    //     }
    // }
    handlePublish=()=>{
        const {contractName,finalCategoryArray,shortDescription,longDescription,sourcePath,imageFinalPath,unlimitedPrice,onePrice,tag}=this.state;
        const alert=this.props.alert;
        const that=this;
        this.setState({loading:true});
        if (this.isEmpty(this.state)) {
            this.props.createNewContract({
                variables: {
                    name: contractName,
                    image: imageFinalPath,
                    short: shortDescription,
                    category: finalCategoryArray,
                    long: longDescription,
                    one: onePrice,
                    unlimited: unlimitedPrice.toString(),
                    source: sourcePath.toString()
                },
                refetchQueries: [{query: getContract}]
            }).then((result) => {
                that.setState({loading: false})
                // alert.success("User Register Successfully. Email varifection send tou your provided Email ",{timeout: 15000})
                this.props.history.push('/')
            }).catch((error) => {
                that.setState({loading: false})
                alert.error(error.toString(), {timeout: 5000})

            })
        }
    }

    render() {
        const {loading,showAssocited,showDialog,crop,imageData,imageSrc,formErrors,contractName,onePrice,tag,shortDescription,longDescription,show,unlimitedPrice}=this.state;
        return loading?<Spinner/>:(
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' >
                    <Grid.Column style={{maxWidth:1355}}>
                        <Grid.Row className={"upload_bg"}>
                            <h2><strong>Publish new  Smart Contract</strong></h2>
                            <h3>General Info</h3>
                        </Grid.Row>
                        <Grid.Row>
                            {showDialog ?
                                <CustomizedDialogs
                                    crop={crop}
                                    imageData={imageData}
                                    src={imageSrc}
                                    onImageLoad={(image) => this.onImageLoad(image)}
                                    onCropChange={(crop) => this.onCropChange(crop)}
                                    onCropComplete={(crop, pixelCrop) => this.onCropComplete(crop, pixelCrop)}
                                    handleSave={() => this.handleSave()}
                                />:""
                            }
                            <div className={"generalContainer"}>
                                <div className={"generalDescription flex"}>
                                    <div>Upload the general information about your contract code (description,pricing,etc)</div>
                                    <Link to={""} className={"cursor"}>Download user guiding for adding a smart contract</Link>
                                </div>
                                <div className={"generalMain flex"}>
                                    <div className={"generalLeft"}>
                                        <Form>
                                            <Fade top delay={300}>
                                                <Form.Field>
                                                    <label>Contract Name:</label>
                                                    <Input
                                                        type={'text'}
                                                        value={contractName} name={"contractName"}
                                                        onChange={this.handleChange}/>
                                                    {formErrors.contractName.length>0&&(
                                                        <span className={"errorMessage"}>{formErrors.contractName}</span>
                                                    )}
                                                    <p className={"info"}>This will show in the list as the title</p>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Contract Category:</label>
                                                    <Select
                                                        components={makeAnimated()}
                                                        isMulti
                                                        size={'large'}
                                                        onChange={this.handelCategory}
                                                        name="contractCategory"
                                                        options={this.categoryOption}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                    />
                                                    {formErrors.contractCategory.length>0&&(
                                                        <span className={"errorMessage"}>{formErrors.contractCategory}</span>
                                                    )}
                                                    <p className={"info"}>What categories suits your contract</p>
                                                    <Form.Field>
                                                        <label >Price per License</label>
                                                        <Input
                                                            fluid size={'large'} value={onePrice}
                                                            label={{ basic: true, content: 'Dapps' }}
                                                            name={"onePrice"}
                                                            onChange={this.handleChange}/>
                                                        {formErrors.onePrice.length>0&&(
                                                            <span className={"errorMessage"}>{formErrors.onePrice}</span>
                                                        )}
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Unlimited License</label>
                                                        <Input
                                                            fluid size={'large'} value={unlimitedPrice}
                                                            label={{ basic: true, content: 'Dapps' }}
                                                            name={"unlimitedPrice"}
                                                            onChange={this.handleChange}/>
                                                        {formErrors.unlimitedPrice.length>0&&(
                                                            <span className={"errorMessage"}>{formErrors.unlimitedPrice}</span>
                                                        )}
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Tag:</label>
                                                        <Input fluid value={tag} size={'large'} type={'text'}
                                                               name={"tag"}
                                                               onChange={this.handleChange}/>
                                                        {formErrors.tag.length>0&&(
                                                            <span className={"errorMessage"}>{formErrors.tag}</span>
                                                        )}
                                                        <p className={"info"}>List of tags</p>
                                                    </Form.Field>
                                                </Form.Field>
                                                <Form.Field>
                                                    <label>Image</label>
                                                    <div className="wrapper">
                                                        <div className="file-upload">
                                                            <input type="file"  accept="image/jpeg,image/png" onChange={this.handleChangeImage} name={"img"}/>
                                                            <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                                                        </div>
                                                    </div>
                                                    {formErrors.imageFinalPath.length>0&&(
                                                        <span className={"errorMessage"}>{formErrors.imageFinalPath}</span>
                                                    )}
                                                </Form.Field>
                                            </Fade>
                                        </Form>
                                    </div>
                                    <Divider orientation="vertical" flexItem />
                                    <div className={"generalRight"}>
                                        <Fade top delay={300}>
                                            <h3>Short Description </h3>
                                            <Form>
                                                <TextArea
                                                    value={shortDescription} name={"shortDescription"}
                                                    onChange={this.handleChange} className={"editor"} >
                                                </TextArea>
                                                {formErrors.shortDescription.length>0&&(
                                                    <span className={"errorMessage"}>{formErrors.shortDescription}</span>
                                                )}
                                            </Form>
                                        </Fade>
                                        <Fade bottom delay={500}>
                                            <h3>Contract Description</h3>
                                            <Form>
                                                <TextArea
                                                    value={longDescription} name={"longDescription"}
                                                    onChange={this.handleChange} className={"editor"} >
                                                </TextArea>
                                                {formErrors.longDescription.length>0&&(
                                                    <span className={"errorMessage"}>{formErrors.longDescription}</span>
                                                )}
                                            </Form>
                                        </Fade>
                                        <Button onClick={this.handleSaveContractData} className={"btnsave"} >Save</Button>
                                    </div>
                                </div>
                            </div>
                        </Grid.Row>
                        <Grid.Row>

                            {showAssocited&&
                                <Fade bottom delay={400}>
                                    <div className={"attached_files"}>
                                        <h3>Associated Files</h3>
                                        <Uploader onSubmit={(files) => this.submit(files)}/>
                                    </div>
                                </Fade>
                            }
                            {show ?
                                this.renderReady()
                                : null
                            }
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default  compose(
    graphql(imageUpload,{name:"uploadImage"}),
    graphql(sourceUpload,{name:"sourceUpload"}),
    graphql(createNewContract,{name:"createNewContract"}),
    withAlert(),
)(UploadSmartContract);
