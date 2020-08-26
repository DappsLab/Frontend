import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import {FormField, UploadFile} from "../../ui/FormFields";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core";
import "../../../assets/scss/general_setting.css"
import {DropDown} from "../../ui/DropDown";
import CustomizedDialogs from "../../ui/DialogBox";
import 'react-image-crop/dist/ReactCrop.css';
import {Validation} from "../../ui/mise";

class GeneralSetting extends Component {
    state={
        imageSrc:null,
        crop: {
            width: 170,
            height: 170,
            aspect:1
        },
        imageData:{
            disabled:false,
            locked:true,
        },

        showAvatar:true,
        showDialog:false,
        formData:{
            full_name: {
                element: 'input',
                value: '',
                config: {
                    placeholder:'Full Name',
                    label: 'Your Name:',
                    name: 'name',
                    type: 'input',
                },
                validation: {
                    required: true,
                },
                showLabel: true
            },
            username: {
                element: 'input',
                value: '',
                config: {
                    placeholder:'Username',
                    label: 'Username:',
                    name: 'name',
                    type: 'input',
                },
                validation: {
                    required: true,
                },
                showLabel: true
            },
            location: {
                element: 'input',
                value: '',
                accept:"image/jpeg,image/png",
                config: {
                    placeholder:'Location',
                    label: 'Location:',
                    name: 'location',

                },
                validation: {
                    required: true,
                },
                showLabel: true
            },
            upload_picture:{
                element: 'input',
                config: {
                    name: 'upload_picture',
                    type: 'input',
                },
            }
        }
    }
    updateImage=(path)=>{
        this.setState({imageSrc:path,showDialog:true})
    }
    removeImage=()=>{
        this.setState({showAvatar:true})
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
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
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
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }
    renderInputs = () =>(
        <div>
            <FormField
                id={'full_name'}
                formData={this.state.formData.full_name}
                change={(element)=> this.updateForm(element)}
            />
            <FormField
                id={'username'}
                formData={this.state.formData.username}
                change={(element)=> this.updateForm(element)}
            />
        </div>
    )
    handleSave=()=>{
       if (this.state.imageSrc!==null){
           this.setState({imageSrc:null})
           console.log(this.state.imageSrc)
       }
        this.setState({showAvatar:false,showDialog:false})
        this.makeClientCrop(this.state.crop);

    }
    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        newFormData[element.id] = newElement;

        this.setState({
            show: validationData[0],
            message: validationData[1],
            formData: newFormData
        })
    }
    render() {
        const { croppedImageUrl } = this.state;
        return (
            <AccountLayout>
                {
                    this.state.showDialog ?
                        <CustomizedDialogs
                            crop={this.state.crop}
                            imageData={this.state.imageData}
                            src={this.state.imageSrc}
                            onImageLoad={(image)=>this.onImageLoad(image)}
                            onCropChange={(crop)=>this.onCropChange(crop)}
                            onCropComplete={(crop,pixelCrop)=>this.onCropComplete(crop,pixelCrop)}
                            handleSave={()=>this.handleSave()}
                        />
                        : null
                }
                <div className={"general_setting"}>
                    <h2>General Info</h2>
                    <div className={"flex general_data"}>
                        <div className={"left"}>
                            {this.renderInputs()}
                            <div className={"general_email flex"}>
                                <label className={"label_inputs"}>Mail</label>
                                <p>abc@gmail.com</p>
                            </div>
                            <div className={"flex general_password"}>
                                <label className={"label_inputs"}>Password</label>
                                <p className={"flex"}>************</p>
                                <Link to={"/account/profile/changr_password"}>chnage</Link>
                            </div>
                            <FormField
                                id={'location'}
                                formData={this.state.formData.location}
                                change={(element)=> this.updateForm(element)}
                            />
                            <div className={"delete_btn flex"}>
                                <label className={"label_inputs"}>Delete your Account</label>
                                <Button variant="contained" color="secondary">Delete Account</Button>
                            </div>
                            <p className={"delete_warning"}>Your account will be permanently deleted in 14 days after opting to do so. Logging in during this time will allow you to cancel the operation to delete the account</p>
                            <div className={"clearBoth"}>  </div>
                            <Button className={"loginbtn"} variant="contained">Save</Button>
                        </div>
                        <div className={"profile_picture"}>
                            <h5>Profile picture</h5>
                            {this.state.showAvatar ?
                                <Avatar className={"avatar"}/>
                                :
                                <Avatar className={"avatar"} alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                            }
                            <DropDown check={false}
                                 removeImage={()=>this.removeImage()}
                                 fileUpload={<UploadFile
                                    formData={this.state.formData.upload_picture}
                                    updateimage={(path)=>this.updateImage(path)}
                                 />}
                            />
                        </div>
                    </div>
                </div>
            </AccountLayout>
        );
    }
}

export default GeneralSetting;
