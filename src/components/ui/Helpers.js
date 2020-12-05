

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
export const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);