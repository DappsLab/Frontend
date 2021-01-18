import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import '../../../../assets/scss/edit_smart_contract.css'
import {useMutation, useQuery} from "@apollo/client";
import {editDapp, dappsbyid, getDapps, me_Query, dappsFile} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Button, Form, Grid, Header, Input, TextArea} from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {categoryOption, nameReg, numericReg} from "../../../ui/Helpers";
import {withAlert} from "react-alert";
import Uploader from "../../../ui/Uploader";
import ReactMarkdown from "react-markdown";
import UploadImage from "../../uploadContract/contractCompoent/UploadImage";


const descriptionRGP=RegExp(/^[a-zA-Z][a-zA-Z\s,.]*$/);
const EditDapp = (props) => {
    const [cName,setcName]=useState("");
    const [cetagory,setCategory]=useState([]);
    const [onePrice,setonePrice]=useState('');
    const [shortCounter,setshortCounter]=useState(200);
    const [imgPath,setImgPath]=useState("");
    const [tags,setTag]=useState([]);
    // const [Loading,setLoading]=useState(false);
    const [shortDescription,setshortDescription]=useState("");
    const [longDescription,setlongDescription]=useState("");
    const [filesource,setFileSource]=useState("");
    const alert=props.alert;
    const RenderDappData=()=> {
        const {loading, error, data} = useQuery(dappsbyid, {
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
        if (data){
           const dapp=data.dAppById;
           // setDapp(dapp);
           return  <Grid stretched columns={2} verticalAlign={'middle'}>
               <Grid.Column width={5}>
                   <Form>
                       <Form.Field>
                           <label>Dapps Name</label>
                           <Input
                               type={'text'} placeholder={dapp.dAppName} name={'cName'}  value={cName}
                               onChange={(event)=>onInputChange(event)}/>
                       </Form.Field>
                       <Form.Field>
                           <label>Dapp Category:</label>
                           <Select
                               components={makeAnimated()}
                               isMulti
                               size={'large'}
                               placeholder={dapp.dAppCategory}
                               value={cetagory}
                               onChange={(value)=>setCategory(value)}
                               name="contractCategory"
                               options={categoryOption}
                               className="basic-multi-select"
                               classNamePrefix="select"
                           />
                       </Form.Field>
                       <Form.Field>
                           <label >Price </label>
                           <Input
                               fluid size={'large'} value={onePrice}
                               label={{ basic: true, content: 'Dapps' }}
                               name={"onePrice"} placeholder={dapp.singleLicensePrice}
                               onChange={(event)=>onInputChange(event)}/>
                       </Form.Field>
                       <UploadImage imgPath={imgPath===''?dapp.image:imgPath} setImgPath={setImgPath}/>
                       {/*<Form.Field>*/}
                       {/*    <label>Image</label>*/}
                       {/*    <div className="wrapper">*/}
                       {/*        <div className="file-upload">*/}
                       {/*            <input type="file"  accept="image/jpeg,image/png" onChange={(event => handleChangeImage(event))} name={"img"}/>*/}
                       {/*            <FontAwesomeIcon className={"arrowIcon"} icon={faArrowUp}/>*/}
                       {/*        </div>*/}
                       {/*        <Avatar src={imgPath===""? dapp.image:imgPath} style={{height:"120px",borderRadius:0,marginLeft:"10px" ,width:"120px"}} />*/}
                       {/*    </div>*/}
                       {/*</Form.Field>*/}
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
                                   placeholder={tags.length>0?"":dapp.tags}
                               />
                           </div>
                           <p className={"info"}>List of tags.Press enter to add tags</p>
                       </Form.Field>
                       <Form.Field>
                           <label>Upload  Source</label>
                           <Uploader className={"file_upload"} type={'dapps'} onSubmit={(file) => Submit(file)}/>
                       </Form.Field>
                   </Form>
               </Grid.Column>
               <Grid.Column width={11}>
                   <h1>Edit Dapp</h1>
                   <div>
                       <Header as={'h3'} floated={'left'}>
                           Short Description
                       </Header>
                       <Header as={'span'} floated={'right'}>
                           Characters left: {shortCounter}
                       </Header>
                       <Form>
                           <TextArea
                               value={shortDescription} placeholder={dapp.shortDescription} name={"shortDescription"}
                               onChange={(event)=>onInputChange(event)} className={"editor"} >
                           </TextArea>
                       </Form>
                   </div>
                   <div>
                       <Header as={'h3'} floated={'left'}>
                           Dapp Description
                       </Header>
                       <Form>
                           <Form.Field className={'longDesc flex'}>
                               <TextArea
                                   value={longDescription} name={"longDescription"}
                                   onChange={(event)=>setlongDescription(event.target.value)} className={"editor"} >
                               </TextArea>
                               <ReactMarkdown source={longDescription} className={'markdown'}/>
                           </Form.Field>
                           <Button onClick={()=>OnUpdate(dapp)}  className={'update-btn'}>Update Dapp</Button>
                       </Form>
                   </div>
               </Grid.Column>
           </Grid>
       }
        return <div>Nothing</div>
    }
    const Submit=(file)=>{
        source({variables:{file}}).catch(err=>[
            alert.error(err.toString(),{timeout:3000})
        ])
    }
    const OnUpdate=(dapp)=>{
        let finalCategoryArray=[];
        for (let i = 0; i < cetagory.length; i++) {
            finalCategoryArray.push(cetagory[i]['value']);
        }
        const input= {}
        input["dAppName"]=cName.length>0?cName.toString():dapp.dAppName.toString()
        input["image"] = imgPath.length>0?imgPath.toString():dapp.image.toString()
        input["tags"]=tags.length>0?tags:dapp.tags
        input["dAppCategory"]=finalCategoryArray.length>0?finalCategoryArray:dapp.dAppCategory
        input["shortDescription"]=shortDescription>0?shortDescription.toString():dapp.shortDescription.toString();
        input["description"]=longDescription.length>0?longDescription.toString():dapp.description.toString()
        input["singleLicensePrice"]=onePrice.length>0?onePrice.toString():dapp.singleLicensePrice.toString();
        if (filesource!==""){
            input["zip"]=filesource;
        }
        updateDapp({
            variables:{
                id:dapp.id,
                input:input
            }
        }).catch(error1=>{
            alert.error(error1.toString(),{timeout:2000})
        })
    }
    const [updateDapp]=useMutation(editDapp,{
        client:Client,
        onCompleted:data => {
            alert.success("Update Successfully" ,{timeout:2000})
            props.history.push('/dashboard/developed_dapps')
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

    });
    const [source]=useMutation(dappsFile,{
    client:Client,
    onCompleted:data2 => {
        setFileSource(data2.dAppUploader);
    },
    context: {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }
    });
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
    // const handleChangeImage=(event)=> {
    //     const files = event.target.files
    //     const currentFile = files[0];
    //     if (currentFile){
    //         UploadImage(currentFile);
    //         event.target.value = '';
    //     }
    // }
    // const [upload]=useMutation(imageUpload,{
    //     client:Client,
    //     onCompleted:data1 => {
    //         setImgPath(data1.imageUploader);
    //     },
    // });
    // const UploadImage=(file)=>{
    //     upload({variables: {file}}).catch(erro=>{
    //         alert.error(erro.toString(),{timeout:2000})
    //     });
    // }
    const removeTags=(i)=> {
        setTag(tags.filter((tag, index) => index !== i))
    }
    const addTags = event => {
        if (event.target.value !== "") {
            setTag( [...tags ,event.target.value]);
            event.target.value = "";
        }
    }
    return (
        <Layout>
            <section className={'generalContainer edit_dapp'}>
                <h2>Edit Dapp</h2>
                {RenderDappData()}
            </section>
        </Layout>
    );
}

export default withAlert()(EditDapp);