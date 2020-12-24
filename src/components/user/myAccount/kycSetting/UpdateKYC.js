import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {countryOptions} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import {kycMutation} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import {FormValidation} from "../../../ui/mise";

const UpdateKyc = (props) => {
    const [type,setType]=useState('text')
    const [street,setStreet]=useState('')
    const [building,setBuilding]=useState('')
    const [postalCode,setPostalCode]=useState('')
    const [city,setCity]=useState('')
    const [country,setCountry]=useState('')
    const [nationality,setNationality]=useState('')
    const [mobile,setMobile]=useState('')
    const [dateOfBirth,setDateOfBirth]=useState('')
    const {alert,fetch,user}=props
    const [updatekyc]=useMutation(kycMutation,{
        client:Client,context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onError:error => {
            alert.error(error.toString(),{timeout:5000})
        },onCompleted:data => {
            fetch()
        }
    })
    const handlSubmit=()=>{

        if(handleEmpty()) {
            updatekyc({
                variables: {
                    id: user.id,
                    mobile: mobile.toString(),
                    birth: dateOfBirth.toString(),
                    nationality: nationality.toString(),
                    country: country.toString(),
                    postalCode: postalCode.toString(),
                    city: city.toString(),
                    street: street.toString(),
                    building: building.toString()
                },
            }).catch(err=>{
                console.log(err.toString())
            })
        }
    }



    const handleEmpty=()=>{
        if ( mobile !== "",city!=="",street !== "",building !== "",postalCode !== "",country !== "",nationality !== "",dateOfBirth !== ""){
            return true
        }else {
            alert.error("All fields are required",{timeout:3000});
            return false
        }
    }
    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Input
                    type={'text'} fluid  label='Street' placeholder={user.kyc.street}
                     name={'street'} value={street}
                    onChange={(event,{name,value})=>setStreet(FormValidation(street,value,name))}
                />
                <Form.Input
                    type={'text'} fluid label='Building Number' placeholder={user.kyc.building}
                    name={'building'} value={building}
                    onChange={(event,{name,value})=>setBuilding(FormValidation(building,value,name))}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    type={'text'} fluid  label='Postal Code' placeholder={user.kyc.postalCode}
                    name={'postalCode'} value={postalCode}
                    onChange={(event,{name,value})=>setPostalCode(FormValidation(postalCode,value,name))}
                />
                <Form.Input
                    type={'text'} fluid label='City' placeholder={user.kyc.city}
                    name={'city'} value={city}
                    onChange={(event,{name,value})=>setCity(FormValidation(city,value,name))}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Select
                    value={country} options={countryOptions}
                    name={'country'} label='Country' placeholder={user.kyc.country}
                    onChange={(event,{value,name})=>setCountry(FormValidation(country,value,name))}
                />
                <Form.Select
                    value={nationality} options={countryOptions}
                    name={'nationality'} label='Nationality' placeholder={user.kyc.nationality}
                    onChange={(event,{value,name})=>setNationality(FormValidation(nationality,value,name))}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    fluid type={'text'} name={'mobile'} value={mobile}
                    label='Mobile' placeholder={user.kyc.mobile}
                    onChange={(event,{value,name})=>setMobile(FormValidation(mobile,value,name))}

                />
                <Form.Input
                    placeholder={user.kyc.birthDate} value={dateOfBirth}
                    fluid type={type} onFocus={()=>{setType('date')}} label={'Date of Birth'} name={'dateOfBirth'}
                    onChange={(event,{name,value})=>setDateOfBirth(value)}
                />
            </Form.Group>
            <Button  onClick={()=>handlSubmit()}>Submit</Button>
        </Form>
    );
};

export default withAlert()(UpdateKyc);