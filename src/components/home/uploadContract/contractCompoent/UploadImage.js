import React, {useState} from 'react';
import {Form} from 'semantic-ui-react'
import CustomizedDialogs from "../../../ui/DialogBox";
import {acceptedImageTypesArray} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import {imageUpload} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import Avatar from "@material-ui/core/Avatar";

const UploadImage = (props) => {
    const [img,setImg]=useState(null);
    const [imgModel,setimgModel]=useState(false);
    const [crop,setCrop]=useState({x: 0, y: 0, width: 300, height: 300, aspect: 1})
    const [imgRef,setImgRef]=useState();
    const {alert ,imgPath,setImgPath}=props
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
            alert.success("Source Uploaded",{timeout:1000})
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

    return (
        <div>
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
            <Form.Field className={'upload-image flex'}>
                <label>Uplaod Image</label>
                <div className="file-upload">
                    <input type="file" accept="image/jpeg,image/png"
                           onChange={(event) => handleChangeImage(event)} name={"img"}/>
                    <button className={'strock'}>Upload </button>
                </div>
            </Form.Field>
            <div>
                {imgPath!==''&& <Avatar src={imgPath} style={{borderRadius:'0', marginBottom:'20px',width:'100px' ,height:'100px'}}/>}
            </div>
        </div>
    );
};

export default withAlert() (UploadImage);