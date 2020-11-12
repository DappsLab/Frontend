import ListItem from "@material-ui/core/ListItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";


const style={
    fontWeight: '300',
    borderBottom:'1px solid #353535',
    display:'flex',
    marginBottom:"10px"
};
export const Account=({icon,title,subtitle})=>{
    return(
        <ListItem button style={style}>
            <div className={"icon_box flex"}><FontAwesomeIcon icon={icon}/></div>
            <div className={"flex nav_text"}>
                <h4>{title}</h4>
                <span>{subtitle}</span>
            </div>
        </ListItem>
    )
}