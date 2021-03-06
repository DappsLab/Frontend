import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {countryOptions, getDateBirth, MyContainer} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import {kycMutation} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import {FormValidation} from "../../../ui/mise";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const UpdateKyc = (props) => {

    const [street,setStreet]=useState('')
    const [building,setBuilding]=useState('')
    const [postalCode,setPostalCode]=useState('')
    const [city,setCity]=useState('')
    const [country,setCountry]=useState('')
    const [nationality,setNationality]=useState('')
    const [mobile,setMobile]=useState('')
    const [dateOfBirth,setDateOfBirth]=useState('')
    const {alert,fetch,user}=props
    const [date, setDate] = useState();

    const [updatekyc]=useMutation(kycMutation,{
        client:Client,context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onError:error => {
            alert.error(error.toString(),{timeout:5000})
        },onCompleted:data => {
            fetch()
            alert.success("Update Successsfully" ,{timeout:3000})
        }
    })
    const handlSubmit=()=>{
        if(handleEmpty()) {
            updatekyc({
                variables: {
                    id: user.id,
                    mobile: mobile!==''?mobile:user.kyc.mobile,
                    birth: dateOfBirth!==''?dateOfBirth:user.kyc.birthDate,
                    nationality: nationality!==''?nationality:user.kyc.nationality,
                    country: country!==''?country:user.kyc.country,
                    postalCode: postalCode!==''?postalCode:user.kyc.postalCode,
                    city: city!==''?city:user.kyc.city,
                    street: street!==''?street:user.kyc.street,
                    building: building!==''?building:user.kyc.building
                },
            }).catch(err=>{
                console.log(err.toString())
            })
        }
    }



    const handleEmpty=()=>{
        if ( mobile !== ""||city!==""||street !== ""||building !== ""||postalCode !== ""||country !== ""||nationality !== ""||dateOfBirth !== ""){
            return true
        }else {
            alert.error("Enter atleast one value",{timeout:3000});
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
            <Form.Group className={'date_box'}>
                <Form.Input
                    fluid type={'text'} name={'mobile'} value={mobile}
                    label='Mobile' placeholder={user.kyc.mobile}
                    onChange={(event,{value,name})=>setMobile(FormValidation(mobile,value,name))}

                />
               <div className={'date-picker'}>
                   <label>Date of Birth</label>
                <DatePicker
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                    placeholderText={user.kyc.birthDate}
                    selected={date}
                    onChange={date => {
                        setDate(date)
                        setDateOfBirth(getDateBirth(date))
                    }}
                    calendarContainer={MyContainer}
                />
               </div>
            </Form.Group>

            <Button  onClick={()=>handlSubmit()}>Submit</Button>
        </Form>
    );
};

export default withAlert()(UpdateKyc);