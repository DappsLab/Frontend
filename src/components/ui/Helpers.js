import React from "react";
import {CalendarContainer} from "react-datepicker";

export const alphanumaric=RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/);
export const nameReg=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
export const numericReg=RegExp(/^[0-9]*$/);
export const floatReg=RegExp(/^[.0-9.]*$/);
export const phoneNumber=RegExp(/^[0-9+]*$/);
export const acceptedImageTypes = 'image/x-png, image/png, image/jpg, image/jpeg';
export const acceptedImageTypesArray = acceptedImageTypes.split(",").map((item) => {return item.trim()});
export const filename=RegExp(/^[a-zA-Z0-9]*$/);
export const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
export const alphabetOutSpace=RegExp(/^[a-zA-Z][a-zA-Z]*$/);



export const infoData=[
    {icon:"wpforms",heading:"Step 1: Submit Form Below",detail:"We will conduct an extensive analysis on your business model, tech and product description, to determine what type of smart contract or DApp is best suited for you."},
    {icon:"check",heading:"Step 2: We Post the Request",detail:"Once we agree on the bounty description, scope, and documentation, you need to send MODEX Tokens into an escrow until the bounty is solved by developers."},
    {icon:"file code outline",heading:"Step 1: Devs start working",detail:"When the bounty is live, the developers in our community will be notified, and they can start working on it right away. If multiple solutions are submitted, we can assist you in selecting a winner."}
]
export const countryOptions = [
    { key: 'pk', value: 'Pakistan', text: 'Pakistan' },
    { key: 'af', value: 'Afghanistan', text: 'Afghanistan' },
    { key: 'ax', value: 'Aland Islands', text: 'Aland Islands' },
    { key: 'al', value: 'Albania', text: 'Albania' },
    { key: 'dz', value: 'Algeria', text: 'Algeria' },
    { key: 'ad', value: 'Andorra', text: 'Andorra' },
    { key: 'ao', value: 'Angola', text: 'Angola' },
    { key: 'ai', value: 'Anguilla', text: 'Anguilla' },
    { key: 'ag', value: 'Antigua', text: 'Antigua' },
    { key: 'ar', value: 'Argentina', text: 'Argentina' },
    { key: 'am', value: 'Armenia', text: 'Armenia' },
    { key: 'aw', value: 'Aruba', text: 'Aruba' },
    { key: 'au', value: 'Australia', text: 'Australia' },
    { key: 'at', value: 'Austria', text: 'Austria' },
]
export const getDate=(data)=>{
    const split=data.split('-');
    let year =  split[0];
    let month_no = split[1] ;
    let date = split[2];
    let month="";
    switch (month_no){
        case '1':
            month="January";
            break;
        case '2':
            month="February"
            break;
        case '3':
            month="March";
            break;
        case '4':
            month="April"
            break;
        case '5':
            month="May";
            break;
        case '6':
            month="June"
            break;
        case '7':
            month="July";
            break;
        case '8':
            month="August"
            break;
        case '9':
            month="September";
            break;
        case '10':
            month="October"
            break;
        case '11':
            month="November";
            break;
        case '12':
            month="December"
            break;
        default:
            break;
    }
    return date + " " + month + " " + year;
}
export const  categoryColors=(color)=> {
    switch (color) {
        case "TOOLS":
            return "#04031C";
        case "SOCIAL":
            return "#5FAD2F";
        case "DOCUMENTS":
            return "#C792EA";
        case "UTILITY":
            return "#0FBA87";
        case "ESCROW":
            return "#8F4114";
        case "FINANCIAL":
            return "#FDD835";
        default:
            return ;
    }
}
export const cardColors=(index)=>{
   index=index % 4
    switch (index){
        case 0:
            return "#DDDDEE"
        case 1:
            return "#D9EBE4"
        case 2:
            return "#CCCCCC"
        case 3:
            return "#E9D9D0"
        default:
            return ;
    }

}
export const  feeProcessTime=(value)=>{
    if (value<300000){
        return " Maximum time"
    }else if (value<700000){
        return " Medium time"
    }else {
        return " Minimum time"
    }
}

export  const MyContainer = ({ className, children }) => {
    return (
        <div style={{padding: "16px", background: "#216ba5", color: "#fff"}}>
            <CalendarContainer className={className}>
                <div style={{background: "#f0f0f0"}}>
                    What is your Date of Birth?
                </div>
                <div style={{position: "relative"}}>{children}</div>
            </CalendarContainer>
        </div>
    );
}

export const getDateBirth=(data)=>{
    let date_ob = new Date(data);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() ;
    let year = date_ob.getFullYear();
    return date+'/'+month+1+'/'+year

}
export  const  categoryOption=[
    {label: "TOOLS",value: "TOOLS"},
    {label: "FINANCIAL",value: "FINANCIAL"},
    {label: "DOCUMENTS",value: "DOCUMENTS"},
    {label: "UTILITY",value: "UTILITY"},
    {label: "SOCIAL",value: "SOCIAL"},
    {label: "ESCROW",value: "ESCROW"}
]
export function getObjects(obj, key, val) {
    let objects = [];
    for (const i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        if ((i === key) && (obj[i] === val || i === key) && (val === '')) {
            objects.push(obj);
        } else if (obj[i] === val && key === ''){
            if (objects.lastIndexOf(obj) === -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}
export const findobject=(object)=>{
    for(let i = 0; i < object.length; i++)
{
    console.log(object[i].type)
    if(object[i].type === 'constructor')
    {
        console.log(object[i])
        return object[i];
    }
}
}