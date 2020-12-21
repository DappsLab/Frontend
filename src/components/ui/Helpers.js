import {Icon} from "semantic-ui-react";

export const nameReg=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
export const numericReg=RegExp(/^[0-9]*$/);
export const acceptedImageTypes = 'image/x-png, image/png, image/jpg, image/jpeg';
export  const acceptedImageTypesArray = acceptedImageTypes.split(",").map((item) => {return item.trim()});
export const filename=RegExp(/^[a-zA-Z0-9]*$/);
export const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);



export const infoData=[
    {icon:"wpforms",heading:"Step 1: Complete the form below",detail:"We will conduct an extensive analysis on your business model, tech and product description, to determine what type of smart contract or DApp is best suited for you."},
    {icon:"check",heading:"Step 2: We Post the Request",detail:"Once we agree on the bounty description, scope, and documentation, you need to send MODEX Tokens into an escrow until the bounty is solved by developers."},
    {icon:"file code outline",heading:"Step 1: Devs start working",detail:"When the bounty is live, the developers in our community will be notified, and they can start working on it right away. If multiple solutions are submitted, we can assist you in selecting a winner."}
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
            return "#5754AB";
        case "UTILITY":
            return "#0FBA87";
        case "ESCROW":
            return "#8F4114";
        case "FINANCIAL":
            return "#1D1B46";
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