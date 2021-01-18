import {alphabetRegex, alphanumaric, alphabetOutSpace, nameReg, phoneNumber, numericReg} from "./Helpers";



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
        case 'fullName':
        case 'location':
        case 'city':
            return value!==""?alphabetRegex.test(value)?value:oldValue:""
        case 'bname':
        case 'cName':
            return value!==""?nameReg.test(value)?value:oldValue:""
        case 'role':
            return value!==""?nameReg.test(value)?value:oldValue:""
        case 'phone':
        case 'mobile':
            return value!==""?phoneNumber.test(value)?value:oldValue:""
        case 'nationality':
        case 'country':
            return value!==""?alphabetOutSpace.test(value)?value:oldValue:""
        case 'street':
        case 'building':
        case 'postalCode':
            return value!==""?alphanumaric.test(value)?value:oldValue:""
        case 'onePrice':
        case 'uPrice':
            return value!==""?numericReg.test(value)?value:oldValue:""
        default:
            return
    }

}
export const CheckDimension=(str)=>{
    let count = (str.match(/]/g) || []).length;
    if(count === 1 ){
        return 1
    }else if(count > 1 ){
        return 2
    }else {
        return 0
    }
}
export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};