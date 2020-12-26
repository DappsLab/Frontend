import React from 'react';
import {useMutation} from "@apollo/client";
import {me_Query, updateUser} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";

const UpdateUser = (props) => {
    const {alert,fullName,setLoading,imgPath,type,location,user}=props

    const [editUser]=useMutation(updateUser,{
        client:Client,context:{
            headers: {
                authorization: localStorage.getItem("token")
            }
        },  refetchQueries:[{query:me_Query,context: { headers: {
                    authorization: localStorage.getItem("token")
                }}
        }],
        onCompleted:data1 => {
            alert.success("Updated Successfully",{timeout:4000})
            // setLoading(false)
        },
        onError:error1 => {
            if (error1.toString().toLowerCase().includes('typeerror: cannot read property \'refetch\' of undefined')){
                console.log(error1.toString())
            }else {
                alert.error(error1.toString(),{timeout:150000})
            }
            // setLoading(false)
        }
    })
    const OnSubmit=()=>{

        if (fullName!==""||type!==""||location!==""||imgPath!=="") {
            // setLoading(true)
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