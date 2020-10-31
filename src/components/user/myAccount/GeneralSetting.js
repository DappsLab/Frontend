import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core";
import "../../../assets/scss/general_setting.css"
import {DropDown} from "../../ui/DropDown";
import CustomizedDialogs from "../../ui/DialogBox";
import 'react-image-crop/dist/ReactCrop.css';
import {Form} from 'semantic-ui-react';
import {imageUpload, updateUser} from "../../../queries/queries"
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";

import {connect} from "react-redux";


const usernameRegex=RegExp(/^[a-zA-Z0-9]*$/);
const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
class GeneralSetting extends Component {
    state = {
        currentUser: this.props.currentUser,
        fullName: "",
        userName: "",
        location: "",
        imageFinalPath:"",
        model:false,
        formErrors:{
            fullName: "",
            userName: "",
            location: "",
        },
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
    }
    //image crop and update
    updateImage=(path)=>{
        this.setState({imageSrc:path,showDialog:true})
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
    async makeClientCrop(crop) {
        var that=this;
        if (this.imageRef && crop.width && crop.height) {
            const file = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ file });
            this.props.uploadImage({variables:{file}}) .then(function(result) {
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
    handleSave=()=>{
       if (this.state.imageSrc!==null){
           this.setState({imageSrc:null})
       }
        this.setState({showDialog:false})
        this.makeClientCrop(this.state.crop);
    }
    //image end
    openModel=()=>this.setState({model:true});
    closeModel=()=>this.setState({model:false});
    handleChange = event => {
        const {name,value}=event.target;
        let formErrors=this.state.formErrors;
        switch (name){
            case 'fullName':
                formErrors.fullName= alphabetRegex.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            case 'userName':
                if(usernameRegex.test(value)){
                    formErrors.userName="";
                    // let Users=this.props.getUsersData.users;
                    // for (let i = 0; i < Users.length; i++) {
                    //     if (Users[i]['userName'] === value ) {
                    //         formErrors.username="Username already exist";
                    //         break;
                    //     }
                    // }
                }else {
                    formErrors.userName="Only Alphabet and Integer Allowed";
                }
                break;
            case 'location':
                formErrors.location= alphabetRegex.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            default:
                break;
        }
        this.setState({[name]:value},()=>{});
    }
    onSubmit=(event)=>{
        const {imageFinalPath,fullName,location}=this.state;
        event.preventDefault();
        const token=localStorage.getItem('token')
        console.log(token)
        this.props.updateUser({
            variables: {
                context:{
                    headers: {
                        authorization: token
                    }
                },
                fullName: fullName,
                location: location,
                avatar: imageFinalPath,
            }
        })
        console.log(this.props)
    }
    // passwordData=(currentPassword,newPassword)=>{
    //     this.setState({currentPassword,newPassword});
    // }
    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                 currentUser: this.props.currentUser
            });
        }
    }
    handleDelete=()=>{
        console.log("delete")
        const id=this.state.currentUser.id;
        // this.props.history.push({pathname:'/delete_user',state:{id:id}})
    }
    render() {
        console.log(this.props)
        const {model,showDialog,crop,imageData,currentUser,imageSrc,formErrors,location,userName,imageFinalPath,fullName } = this.state;
        return  (
            <AccountLayout>
                {showDialog ?
                    <CustomizedDialogs
                        crop={crop}
                        imageData={imageData}
                        src={imageSrc}
                        onImageLoad={(image) => this.onImageLoad(image)}
                        onCropChange={(crop) => this.onCropChange(crop)}
                        onCropComplete={(crop, pixelCrop) => this.onCropComplete(crop, pixelCrop)}
                        handleSave={() => this.handleSave()}
                    />
                    : null
                }
                <div className={"general_setting"}>
                    <h2>General Info</h2>
                    <div className={"flex general_data"}>
                        <div className={"left"}>
                            <Form>
                                <Form.Field className={"flex"} >
                                    <label>First name</label>
                                    <Form.Input
                                        placeholder={currentUser.fullName} type={"text"}
                                        value={fullName} className={formErrors.fullName.length>0?"error":""}
                                        name="fullName" onChange={this.handleChange} />
                                    </Form.Field>
                                    {formErrors.fullName.length>0&&(
                                        <span className={"flex errorMessage"}>{formErrors.fullName}</span>
                                    )}
                                    <Form.Field className={"flex"}>
                                        <label>Username</label>
                                        <Form.Input
                                            placeholder={currentUser.userName} type={"text"}
                                            value={userName} className={formErrors.userName.length>0?"error":""}
                                            name="userName" onChange={this.handleChange}/>
                                    </Form.Field>
                                    {formErrors.userName.length>0&&(
                                        <span className={"flex errorMessage"}>{formErrors.userName}</span>
                                    )}
                                    <Form.Field  className={"flex"}>
                                        <label>Email</label>
                                        <Form.Input
                                            className={"opacity"} disabled transparent
                                            placeholder={currentUser.email}
                                            type={"email"} name="email" />
                                    </Form.Field>
                                    {/*<Form.Field className={"flex password opacity"}>*/}
                                    {/*    <label>Password</label>*/}
                                    {/*    <Form.Input*/}
                                    {/*        disabled transparent placeholder={"************"}*/}
                                    {/*        type={"password"} name="password" />*/}
                                    {/*    <a onClick={this.openModel} >Change</a>*/}
                                    {/*</Form.Field>*/}
                                    <Form.Field className={"flex"}>
                                        <label>Location</label>
                                        <Form.Input
                                            placeholder={currentUser.location===null?"Location":currentUser.location}
                                            type={"text"} className={formErrors.location.length>0?"error":""}
                                            name="location" onChange={this.handleChange} value={location}/>
                                    </Form.Field>
                                    {formErrors.location.length>0&&(
                                        <span className={"flex errorMessage"}>{formErrors.location}</span>
                                    )}
                                    <Form.Field className={"flex"}>
                                        <label>Delete your Accoun</label>
                                        <Button
                                            variant="contained" onClick={this.handleDelete} color="secondary">Delete Account</Button>
                                    </Form.Field>
                                    <Button onClick={this.onSubmit} className={"loginbtn"}  variant="contained">Save</Button>
                                </Form>
                            </div>
                            <div className={"profile_picture"}>
                                <h5>Profile picture</h5>
                                {imageFinalPath===""?
                                    <Avatar className={"avatar"} alt="Crop" style={{maxWidth: '100%'}}
                                            src={currentUser.avatar}/>:
                                    <Avatar className={"avatar"} alt="Crop" style={{maxWidth: '100%'}} src={imageFinalPath} />
                                }
                                <DropDown
                                    check={false}
                                    updateimage={(path)=>this.updateImage(path)}
                                    removeImage={()=>this.removeImage()}
                                />
                            </div>
                        </div>
                    </div>
                    {/*<ChangePassword*/}
                    {/*    model={model}*/}
                    {/*    closeModel={this.closeModel}*/}
                    {/*    passwordData={this.passwordData}*/}
                    {/*/>*/}
            </AccountLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default compose(
   connect(mapStateToProps),
    graphql(imageUpload,{name:"uploadImage"}),
    graphql(updateUser,{name:"updateUser"})
)(GeneralSetting);
