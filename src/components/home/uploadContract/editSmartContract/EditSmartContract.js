import React, { useState} from 'react';
import Layout from "../../../../hoc/Layout";
import '../../../../assets/scss/edit_smart_contract.css'
import {acceptedImageTypesArray, nameReg, numericReg} from "../../../ui/Helpers";
import {Form, Grid, Input} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import CustomizedDialogs from "../../../ui/DialogBox";
import {useMutation, useQuery} from "@apollo/client";
import {contractById, imageUpload} from "../../../../queries/queries";
import {Spinner2} from "../../../ui/Spinner";
import {Client} from "../../../../queries/Services";
import Avatar from "@material-ui/core/Avatar";
import {withAlert} from "react-alert";

const EditSmartContract =(props)=> {
    const [cName,setcName]=useState("");
    const [cetagory,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [uPrice,setuPrice]=useState("");
    const [img,setImg]=useState(null);
    const [imgPath,setImgPath]=useState("");
    const [imgModel,setimgModel]=useState(false);
    const [crop,setCrop]=useState({x: 0, y: 0, width: 300, height: 300, aspect: 1})
    const [imgRef,setImgRef]=useState();
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
            case 'uPrice':
                numericReg.test(value)&&setuPrice(value);
                value===""&&setuPrice("");
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

    const RenderContractData=()=>{
        const {loading,error,data}=useQuery(contractById,{
            variables:{id:props.match.params.id},
            client:Client
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        const contract=data.smartContractById
        console.log(contract)
        return <Grid.Column width={5}>
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
                    <label>Image</label>
                    <div className="wrapper">
                        <div className="file-upload">
                            <input type="file"  accept="image/jpeg,image/png" onChange={(event => handleChangeImage(event))} name={"img"}/>
                            <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>
                        </div>
                        <Avatar src={imgPath===""? contract.image:imgPath} style={{height:"120px",marginLeft:"10px" ,width:"120px"}} />
                    </div>
                </Form.Field>
            </Form>
        </Grid.Column>
    }
    return (
        <Layout>
        <section className={'edit_contract'}>
            <h2>Edit Smart contract</h2>
            <Grid stretched columns={2} verticalAlign={'middle'}>
                {RenderContractData()}
                <Grid.Column width={11}>

                </Grid.Column>
            </Grid>
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