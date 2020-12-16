
export const nameReg=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
export const numericReg=RegExp(/^[0-9]*$/);
export const acceptedImageTypes = 'image/x-png, image/png, image/jpg, image/jpeg';
export  const acceptedImageTypesArray = acceptedImageTypes.split(",").map((item) => {return item.trim()});
export const filename=RegExp(/^[a-zA-Z0-9]*$/);
export const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);


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
            return "#5754AB";
        case "UTILITY":
            return "#0FBA87";
        case "ESCROW":
            return "#8F4114";
        case "FINANCIAL":
            return "#FEE440";
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