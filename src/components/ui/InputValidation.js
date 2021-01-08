import web3 from 'web3'
export const argumentsValidator = async(input)=>{

}
export const typeDivider= (type)=>{
    let res = type.split("[");
    for(let i=0; i<res.length; i++){
        res[i]=res[i].replace("]","")
    }
    return res;
}
export const isString= (string)=>{
    let letters = /^[A-Za-z]+$/;
    return !!string.match(letters);
}
export const recursiveChecker = (dataType, data)=>{
    let partialData
    dataType = dataType.split("[")[0];
    for(partialData of data){
        let str = JSON.stringify(partialData)
        let count = (str.match(/]/g) || []).length;
        if(count > 1 ){
            return recursiveChecker(dataType, partialData)
        }else{
            let str = JSON.stringify(partialData)
            let count = (str.match(/]/g) || []).length;
            if(count === 1){
                return recursiveChecker(dataType, partialData)
            }else{
                // console.log("data:",dataType,":",partialData)
                switch (dataType) {
                    case 'int':
                    case 'int256':
                        if(!isInt(partialData)){
                            return false
                        }
                        break;
                    case 'bool':
                        if(!stringTOBoolean(partialData)){
                            return false
                        }
                        break;
                    case 'address':
                        if(!isAddress(partialData)){
                            return false
                        }
                        break;
                    case 'string':
                    case 'bytes32':
                        if(!isString(partialData)){
                            return false
                        }
                        break;

                    case 'Uint':
                    case 'uint256':
                        if(!isUint(partialData)){
                            return false
                        }
                        break;
                    case 'int8':
                        if(!isInt8(partialData)){
                            return false
                        }
                        break;
                    case 'int16':
                        if(!isInt16(partialData)){
                            return false
                        }
                        break;
                    case 'int32':
                        if(!isInt32(partialData)){
                            return false
                        }
                        break;
                    case 'int64':
                        if(!isInt64(partialData)){
                            return false
                        }
                        break;
                    case 'uint8':
                        if(!isUint8(partialData)){
                            return false
                        }
                        break;
                    case 'uint16':
                        if(!isUint16(partialData)){
                            return false
                        }
                        break;
                    case 'uint32':
                        if(!isUint32(partialData)){
                            return false
                        }
                        break;
                    case 'uint64':
                        if(!isUint64(partialData)){
                            return false
                        }
                        break;
                    default:
                        return false
                }
            }
        }
    }
    return true
}

export const isNumber= (string)=>{
    let letters = /^[0-9]+$/;
    return !!string.value.match(letters);
}

export const isInt8= (number)=>{
    return number >= -128 && number <= 127;
}

export const isInt16= (number)=>{
    return number >= -32768 && number <= 32767;
}
export const isInt32= (number)=>{
    return number >= -2147483648 && number <= 2147483647;
}

export const isInt64= (number)=>{
    return number >= -9223372036854775808 && number <= 9223372036854775807;
}

export const isInt128= (number)=>{
    return number >= -170141183460469231731687303715884105728 && number <= 170141183460469231731687303715884105727;
}
export const isInt= (number)=>{
    return number >= -57896044618658097711785492504343953926634992332820282019728792003956564819968 && number <= 57896044618658097711785492504343953926634992332820282019728792003956564819967;
}

export const isUint= (number)=>{
    return number >= 0 && number <= 115792089237316195423570985008687907853269984665640564039457584007913129639935;
}

export const isUint128= (number)=>{
    return number >= 0 && number <= 340282366920938463463374607431768211455;
}
export const isUint64= (number)=>{
    return number >= 0 && number <= 18446744073709551615;
}

export const isUint32= (number)=>{
    return number >= 0 && number <= 4294967295;
}
export const isUint16= (number)=>{
    return number >= 0 && number <= 65535;
}
export const isUint8= (number)=>{
    return number >= 0 && number <= 255;
}


export const isAddress =  (address) =>{
    return web3.utils.isAddress(address)
}

export const isFloat= (string)=>{
    let letters = /^[-+]?[0-9]+\.[0-9]+$/;
    return !!string.value.match(letters);
}

export const isFixedMxN = (string,M,N)=>{

}
export const stringToByte32Array =  (string) =>{
    return web3.utils.toAscii(string)
}
export const stringToInt =  (string) =>{
    return parseInt(string)
}


export const stringTOBoolean =  (string)=>{
    return string.toLowerCase() === "true" || string.toLowerCase() === 'false';
}
