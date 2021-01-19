import React, {useState} from 'react';
import {Form} from "semantic-ui-react";
import {useMutation} from "@apollo/client";
import {createCustomOrder} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";
import {FormValidation} from "../../ui/mise";

const SubmitRequest = (props) => {
    const [website,setWebsite]=useState('');
    const [bname,setBName]=useState('');
    const [email,setEmail]=useState('');
    const [role,setRole]=useState('');
    const [type,setType]=useState("");
    const [phone,setPhone]=useState("");
    const [description,setDescription]=useState('')
    const {alert}=props;




    const [create]=useMutation(createCustomOrder,{
        client:Client,context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onCompleted:data => {
            console.log(data)
        },onError:error => {
            console.log(error.toString())
        }
    })
    const  handelSubmit=()=>{

        if (isEmpty()){
            create({
                variables:{
                    input:{
                        businessName:bname,
                        businessPhone:phone,
                        businessEmail:email,
                        productType:type,
                        requirements:description,
                        status:'PENDING',
                        role: role,
                        businessWebsite: website,
                    }
                }
            }).catch(err=>{
                console.log(err.toString())
            })
        }

    }

    const optionType=[
        {key:"sm",value:"SMARTCONTRACT",text:"SMARTCONTRACT"},
        {key:"dp",value:"DAPP",text:"DAPP"}
    ]
    const isEmpty=()=>{
        if (website!==""&&bname!==""&&email!==""&&phone!==""&&role!==""&&type!==""&&description!==""){
            return true
        }else {
            alert.error("All Fields not Required",{timeout:3000})
        }
    }
    const desc='Please Describe your business, the core infrastructure and what smart contract or DApp you need built.'
    return (
        <div>
            <h2>Submit the Smart Contract Info</h2>
            <Form className={'request-form'}>
               <Form.Group widths={'equal'}>
                   <Form.Input
                       text={'text'} fluid label={'Business Name'} placeholder={'Business Name'}
                       onChange={(event, {name, value})=>setBName(FormValidation(bname,value,name))}
                       name={'bname'} value={bname}
                   />
                   <Form.Select
                       fluid label={'Request Type'} placeholder={'Request Type'} options={optionType} name={'type'}
                       value={type} onChange={(event ,{value})=>{setType(value);} }
                   />
               </Form.Group>
                <Form.Group widths={"equal"}>
                    <Form.Input
                        type={'text'} fluid  label='Role' placeholder={'Role'} value={role}  name={'role'}
                        onChange={(event, {name, value})=>setRole(FormValidation(role,value,name))}
                    />
                    <Form.Input
                        type={'text'} fluid label='Business Website' placeholder={'Business Website'}
                        onChange={(event)=>setWebsite(event.target.value)}
                        name={'website'} value={website}
                    />
                </Form.Group>
                <Form.Group widths={"equal"}>
                    <Form.Input
                        type={'email'} fluid  label='Email' placeholder={'Email'} value={email} name={'email'}
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                    <Form.Input
                        type={'text'} fluid label='Phone Number' name={'phone'} placeholder={'Phone Number'}
                        onChange={(event,{name,value})=>setPhone(FormValidation(phone,value,name))}
                         value={phone}
                    />
                </Form.Group>
                <Form.TextArea
                    label={desc} name={'description'} value={description}
                    onChange={(event)=>setDescription(event.target.value)}> </Form.TextArea>

                <button color={'blue'} onClick={handelSubmit}>Submit Request</button>
            </Form>
        </div>
    );
};

export default withAlert()(SubmitRequest);