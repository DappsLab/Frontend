import React from 'react';
import {useMutation} from "@apollo/client";
import {updateUser} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";

const UpdateUser = (props) => {
    const {alert,fetch,fullName,imgPath,type,location,user}=props

    const [editUser]=useMutation(updateUser,{
        client:Client,context:{
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        onCompleted:data1 => {
            fetch()
            alert.success("Updated Successfully",{timeout:4000})
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:5000})
        }
    })
    const OnSubmit=()=>{

        if (fullName!==""||type!==""||location!==""||imgPath!=="") {
            editUser({
                variables: {
                    fullName: fullName.length > 0 ? fullName : user.fullName,
                    location: location.length > 0 ? location : user.location,
                    avatar: imgPath === "" ? user.avatar : imgPath,
                    type: type === "" ? user.type : type
                }
            }).catch(e => {
                console.log(e.toString())
            });
        }else {
            alert.error("No chnage Yet",{timeout:3000})
        }
    }
    return (
        <button className={'update strock'} onClick={()=>OnSubmit()}>Save Information</button>
    );
};

export default withAlert()(UpdateUser);