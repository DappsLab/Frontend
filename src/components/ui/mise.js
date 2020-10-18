import {Link} from "react-router-dom";
import React from "react";

export const LoginTop =({heading,paragraph,link,linkto})=>{
    let template;
    const renderTemplate=()=> {
       template=(
           <div className={"flex login_top"}>
               <div className={"login_left"}>
                   <h2>{heading}</h2>
                   <p>{paragraph}</p>
               </div>
               <Link to={linkto}>{link}</Link>
           </div>
       );
        return template;
    }
    return(renderTemplate())
}

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