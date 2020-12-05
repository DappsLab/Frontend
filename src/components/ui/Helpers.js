

export const  returnColor=(color)=> {
    switch (color) {
        case "TOOLS":
            return "orange";
        case "SOCIAl":
            return "grey";
        case "DOCUMENTS":
            return "teal";
        case "UTILITY":
            return "purple";
        case "ESCROW":
            return "blue";
        case "FINANCIAL":
            return "green";
        default:
            return "violet";
    }
}