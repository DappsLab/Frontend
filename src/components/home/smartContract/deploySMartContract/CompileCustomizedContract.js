import React from "react";
import {Button, Divider, Form, Icon, Item} from "semantic-ui-react";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";


export const CompileResult=(props)=>{
    const {loading,error,data}=useQuery(me_Query,{client:Client,
        onCompleted:data1 => {
            props.setUser(data1.me);
            console.log("me query",data1.me)
        },onError:error1 => {
            alert.error(error1.toString(),{timeout:5000})
        },
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }
    });
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    console.log(data.me)
    return (
        <div className={'compile_result'}>
            <h2>Successfully Compiled</h2>
            <Divider/>
            <Icon circular size={'huge'}  inverted color='green'  name={'checkmark'}/>
            <p>Huray!</p>
            <p>Your contract is compiled and ready for deployment</p>
            <Button color={'blue'}>Download</Button>
            <Button color={'green'}>Deploy</Button>
        </div>
        )
}
export const Deploy=()=>{
    return <div>deploy</div>
}