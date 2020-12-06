import React from 'react';
import {useQuery} from "@apollo/client";
import {me_Query} from "./queries";
import {Client} from "./Services";
import {connect} from "react-redux";
import {setUser} from "../actions/Actions";

const MeQuery = (props) => {
    const {loading,error,data}=useQuery(me_Query,{client:Client,
        onCompleted:data1 => {
            props.setUser(data1.me);
            console.log(data1.me)
        },onError:error1 => {
            alert.error(error1.toString(),{timeout:5000})
        },
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }
    });
    if (!loading&&error===undefined&&data){
        return "good"
    }
};

export default connect(null,{setUser}) (MeQuery);