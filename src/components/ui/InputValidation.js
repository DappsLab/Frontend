import web3 from 'web3'
export const argumentsValidator = async(input)=>{

}
export const typeDivider= async(type)=>{
    let res = type.split("[");
    for(let i=0; i<res.length; i++){
        res[i]=res[i].replace("]","")
    }
    return res;
}
export const isString= async(string)=>{
    let letters = /^[A-Za-z]+$/;
    if (string.value.match(letters))
    {
        return true;
    }else return false;
}
export const recursiveChecker = (dataType, data)=>{
    for(partialData of data){
        let str = JSON.stringify(partialData)
        let count = (str.match(/]/g) || []).length;
        if(count > 1 ){
            recursiveChecker(dataType, partialData)
        }else{
            let str = JSON.stringify(partialData)
            let count = (str.match(/]/g) || []).length;
            if(count === 1){
                recursiveChecker(dataType, partialData)
            }else{
                console.log("data:",partialData)
            }
        }
    }
}

export const isNumber= async(string)=>{
    let letters = /^[0-9]+$/;
    if (string.value.match(letters))
    {
        return true;
    }else return false;
}

export const isInt8= async(number)=>{
    if(number >= -128 && number <= 127){
        return true;
    }else{
        return false;
    }
}

export const isInt16= async(number)=>{
    if(number >= -32768 && number <= 32767){
        return true;
    }else{
        return false;
    }
}
export const isInt32= async(number)=>{
    if(number >= -2147483648 && number <= 2147483647){
        return true;
    }else{
        return false;
    }
}

export const isInt64= async(number)=>{
    if(number >= -9223372036854775808 && number <= 9223372036854775807){
        return true;
    }else{
        return false;
    }
}

export const isInt128= async(number)=>{
    if(number >= -170141183460469231731687303715884105728 && number <= 170141183460469231731687303715884105727){
        return true;
    }else{
        return false;
    }
}
export const isInt= async(number)=>{
    if(number >= -57896044618658097711785492504343953926634992332820282019728792003956564819968 && number <= 57896044618658097711785492504343953926634992332820282019728792003956564819967){
        return true;
    }else{
        return false;
    }
}

export const isUint= async(number)=>{
    if(number >= 0 && number <= 115792089237316195423570985008687907853269984665640564039457584007913129639935){
        return true;
    }else{
        return false;
    }
}

export const isUint128= async(number)=>{
    if(number >= 0 && number <= 340282366920938463463374607431768211455){
        return true;
    }else{
        return false;
    }
}
export const isUint64= async(number)=>{
    if(number >= 0 && number <= 18446744073709551615){
        return true;
    }else{
        return false;
    }
}

export const isUint32= async(number)=>{
    if(number >= 0 && number <= 4294967295){
        return true;
    }else{
        return false;
    }
}
export const isUint16= async(number)=>{
    if(number >= 0 && number <= 65535){
        return true;
    }else{
        return false;
    }
}
export const isUint8= async(number)=>{
    if(number >= 0 && number <= 255){
        return true;
    }else{
        return false;
    }
}


export const isAddress = async (address) =>{
    return web3.utils.isAddress(address)
}

export const isFloat= async(string)=>{
    let letters = /^[-+]?[0-9]+\.[0-9]+$/;
    if (string.value.match(letters))
    {
        return true;
    }else return false;
}

export const isFixedMxN = async(string,M,N)=>{

}
export const stringToByte32Array = async (string) =>{
    return web3.utils.toAscii(string)
}
export const stringToInt = async (string) =>{
    return parseInt(string)
}


export const stringTOBoolean = async (string)=>{
    if(string.toLowerCase()==='false'||string==='0'){
        return false;
    }else {
        return true;
    }
}
