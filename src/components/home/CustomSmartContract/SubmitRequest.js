import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {useMutation} from "@apollo/client";
import {createCustomOrder} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";

const SubmitRequest = (props) => {
    const [name,setName]=useState('');
    const [title,setTitle]=useState('');
    const [website,setWebsite]=useState('');
    const [bname,setBName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [city,setCity]=useState('');
    const [country,setCountry]=useState('');
    const [description,setDescription]=useState('')
    const {alert}=props;




    const [create]=useMutation(createCustomOrder,{
        client:Client,context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
    })
    const  handelSubmit=()=>{

        if (isEmpty()){
            console.log(name,title,website,bname,email,phone,city,country,description)
            // create({
            //     variables:{
            //         input:{
            //             businessName:,
            //             businessPhone:,
            //             businessEmail:,
            //             productType:,
            //             requirements:,
            //             status:,
            //             role:,
            //             businessWebsite:,
            //             createdAt:"",
            //             updatedAt:"",
            //         }
            //     }
            // })
        }

    }

    const isEmpty=()=>{
        if (name!=="",title!=="",website!=="",bname!=="",email!=="",phone!=="",city!=="",country!=="",description!==""){
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
                <Form.Input
                    text={'text'} fluid label={'Business Name'} placeholder={'Business Name'}
                    onChange={(event)=>setBName(event.target.value)} name={'bname'} value={bname}
                />
                <Form.Input
                    text={'text'} fluid label={'Full Name'} placeholder={'Full Name'}
                    onChange={(event)=>setName(event.target.value)} name={'name'} value={name}
                />
                <Form.Group widths={"equal"}>
                    <Form.Input
                        type={'text'} fluid  label='Position/Title' placeholder={'Position/Title'} value={title}
                        onChange={(event)=>setTitle(event.target.value)} name={'title'}
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
                        type={'text'} fluid label='Phone Number' placeholder={'Phone Number'}
                        onChange={(event)=>setPhone(event.target.value)}
                         value={phone}
                    />
                </Form.Group>
                <Form.Group widths={"equal"}>
                    <Form.Input
                        type={'text'} fluid  label='City' placeholder={'City'} value={city} name={'city'}
                        onChange={(event)=>setCity(event.target.value)}
                    />
                    <Form.Input
                        type={'text'} fluid label='Country' placeholder={'Country'}
                        onChange={(event)=>setCountry(event.target.value)}
                        value={country}
                    />
                </Form.Group>
                <Form.TextArea
                    label={desc} name={'description'} value={description}
                    onChange={(event)=>setDescription(event.target.value)}> </Form.TextArea>

                <Button color={'blue'} onClick={handelSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

export default withAlert()(SubmitRequest);