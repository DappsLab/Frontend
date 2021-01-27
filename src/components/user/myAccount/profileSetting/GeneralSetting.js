import React, { useState} from 'react';
import {Avatar} from "@material-ui/core";
import "../../../../assets/scss/general_setting.css"
import CustomizedDialogs from "../../../ui/DialogBox";
import 'react-image-crop/dist/ReactCrop.css';
import {Form} from 'semantic-ui-react';
import {imageUpload, me_Query} from "../../../../queries/queries"
import {flowRight as compose} from 'lodash';
import {connect} from "react-redux";
import {setUser} from "../../../../reducer/user/user.actions";
import { useMutation, useQuery} from "@apollo/client";
import {withAlert} from "react-alert";
import AccountLayout from "../../../../hoc/AccountLayout";
import { acceptedImageTypesArray} from "../../../ui/Helpers";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import UpdateUser from "./UpdateUser";
import {FormValidation} from "../../../ui/mise";
import ChangePassword from "./change-password";
import CustomButton from "../../../ui/custom-button/custom-button.component";


const  GeneralSetting =(props)=>{
    const [imgPath,setImgPath]=useState("");
    const [img,setImg]=useState(null);
    const [imgModel,setimgModel]=useState(false);
    const [crop,setCrop]=useState(
        {x: 0, y: 0, width: 300, height: 300, aspect: 1}
        )
    const [imgRef,setImgRef]=useState();
    const [fullName,setFullName]=useState('');
    const [Loading,setLoading]=useState(false)
    const [passToggle,setPassToggle]=useState(false)
    const [type,setType]=useState('');
    const [location,setLocation]=useState('');
    const {alert,setUser}=props;


    const  typeOptions=[
        {key:'u',value:'USER',text:'USER'},
        {key:'dev',value:'DEVELOPER',text:'DEVELOPER'},
    ]
    const context= {
        headers: {
            authorization: localStorage.getItem("token")
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
        client:Client,context:context,
        onCompleted:data1 => {
            alert.success("Image Uploaded",{timeout:1000})
            setImgPath(data1.imageUploader);
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:2000})
            console.log(error1.toString())
        }
    });
    const UploadImage=(file)=>{

        upload({variables: {file}}).catch(err=>{
            console.log(err.toString())
        });
    }
    const handleSave=()=>{
        if (img!==null){
            setImg(null)
        }
        setimgModel(false)
        MakeClientCrop(crop);
    }
    //image end

    const handleDelete=()=>{
        console.log("id")
    }

    const  RenderData= ()=> {
        const {data, error, loading} =  useQuery(me_Query, {
            client: Client, context: context,fetchPolicy:"network-only",
            onCompleted: data1 => {
                setUser(data1.me)
                // setLoading(false)
            }
        })

        if (loading) return <Spinner2/>;
        if (error) return <div>{error.toString()}</div>
        if (Loading) return <Spinner2/>;
        if (data) {
            const user=data.me
            return (
                <div>
                    <div className={"flex general_data"}>
                        <div className={"general_left"}>
                            <h2>Profile</h2>
                            <Form>
                                <Form.Field>
                                    <label>First name</label>
                                    <Form.Input
                                        placeholder={user.fullName} type={"text"}
                                        value={fullName} onChange={(event, {
                                        value,
                                        name
                                    }) => setFullName(FormValidation(fullName, value, name))}
                                        name="fullName"/>
                                </Form.Field>
                                <Form.Field className={"opacity"}>
                                    <label>Username</label>
                                    <Form.Input disabled
                                                placeholder={user.userName} type={"text"}
                                                name="userName"/>
                                </Form.Field>

                                <Form.Field>
                                    <label>User Type</label>
                                    <Form.Select
                                        placeholder={user.type} name={'type'} value={type}
                                        options={typeOptions}
                                        onChange={((event, {value}) => {
                                            setType(value)
                                        })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Location</label>
                                    <Form.Input
                                        placeholder={user.location === null ? "Location" : user.location}
                                        type={"text"} name="location" value={location}
                                        onChange={(event, {
                                            value,
                                            name
                                        }) => setLocation(FormValidation(location, value, name))}/>
                                </Form.Field>
                                <UpdateUser type={type} imgPath={imgPath} location={location} fullName={fullName}
                                            user={user} setLoading={setLoading}/>
                            </Form>
                        </div>
                        <div className={"general_right"}>
                            <div className={'profile_picture flex'}>
                                {imgPath === "" ?
                                    <Avatar className={"avatar"} alt="Crop" style={{maxWidth: '100%'}}
                                            src={user.avatar}/> :
                                    <Avatar className={"avatar"} alt="Crop" style={{maxWidth: '100%'}} src={imgPath}/>
                                }
                                <div className="picture_btn">
                                    <div className="file-upload">
                                        <input type="file" accept="image/jpeg,image/png"
                                               onChange={(event) => handleChangeImage(event)} name={"img"}/>
                                        <button className={'strock'}>Upload Photo</button>
                                    </div>
                                    <button onClick={() => {
                                        setImgPath("")
                                    }} className={'strock remove_picture'}>Remove Photo
                                    </button>
                                </div>
                            </div>
                            <Form>
                                <Form.Field className={"opacity"}>
                                    <label>Email</label>
                                    <Form.Input
                                        className={"opacity"} disabled
                                        placeholder={user.email}
                                        type={"email"} name="email"/>
                                </Form.Field>
                                <Form.Field className={'delete-btn'}>
                                    <label>Delete your Account</label>
                                   <div className={'flex'}>
                                       <span>Want to delete your account?</span>
                                       <button onClick={() => handleDelete()}>Delete Account</button>
                                   </div>
                                </Form.Field>
                                <Form.Field className={'flex change'}>
                                    <label>want to change Password</label>
                                    <CustomButton isChangePassword onClick={()=>{setPassToggle(!passToggle)}}>Change Password</CustomButton>
                                </Form.Field>
                            </Form>

                        </div>
                    </div>
                    {passToggle?<ChangePassword toggle={passToggle} setToggle={setPassToggle}/>:""}
                    {imgModel ?
                        <CustomizedDialogs
                            crop={crop}
                            imageData={{disabled: false, locked: true}}
                            src={img}
                            onImageLoad={(image) => onImageLoad(image)}
                            onCropChange={(crop) => onCropChange(crop)}
                            onCropComplete={(crop, pixelCrop) => onCropComplete(crop, pixelCrop)}
                            handleSave={() => handleSave()}
                        /> : ""
                    }
                </div>
            );
        }
        return <div>Refresh</div>
    }

    return(
        <AccountLayout {...props}>
            {RenderData()}
        </AccountLayout>
    )
}

export default compose(
   connect(null, {setUser}),withAlert()
)(GeneralSetting);
