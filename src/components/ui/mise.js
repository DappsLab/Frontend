import React from "react";
import {nameReg, phoneNumber} from "./Helpers";



export const Validation =(element)=>{
    let error = [true,''];
    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${valid ? '' : 'Must be valid email'}`;
        error = valid ? error: [valid,message]
    }
    if(element.validation.name){
        const valid = /^[A-Za-z]+$/.test(element.value);
        console.log(valid)
        const message = `${valid ? '' : 'Must be Alphabet'}`;
        error = valid ? error:[valid,message]
    }
    if (element.validation.required){
        const valid = element.value.trim()  !== '';
        const message=`${valid ? '' : 'This field is required'}`;
        error = valid ?error:  [valid,message]
    }
    return error;
};

export const  isFormValid=values=>{
    let valid=true;
   if (values.fullName===""||values.email===""||values.password===""||values.passwordConfirmation===""){
       valid=false;
   }
    return valid;
}

export const FormValidation=(oldValue,value,name)=>{
    switch (name){
        case 'bname':
            return value!==""?nameReg.test(value)?value:oldValue:""
        case 'role':
            return value!==""?nameReg.test(value)?value:oldValue:""
        case 'phone':
            console.log(value)
            return value!==""?phoneNumber.test(value)?value:oldValue:""
        default:
            return
    }

}