import React, {useState} from 'react';
import {withAlert} from "react-alert";
import {useQuery} from "@apollo/client";
import {getABI} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {getObjects} from "../../../ui/Helpers";
import {Spinner2} from "../../../ui/Spinner";
import {Button} from "semantic-ui-react";

const RenderMainArguments = (props) => {
    const {license,fee,name,alert}=props
    const newID=license.compilations[license.compilations.length - 1].id;
    const [inputSize,setInputSize]=useState(0)


    const onDeploy=()=>{
        const input= {}
        input["testCompiledContractId"] = newID
        input["testAddressId"]=license.testOrder.testAddress.id
        input['deplopmentLabel']=name
        input['fee']=fee
        if (inputSize>0){
            // argumentsArray:''
        }
    }
    const {data,error,loading}=useQuery(getABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:newID
        },onCompleted:data1 => {
            const abi=JSON.parse(data1.getABI);
            const inputArr=getObjects(abi,"type","constructor")
            if (inputArr.length>0) {
                if (inputArr[0].inputs.length > 0) {
                    console.log("array",inputArr[0])
                    setInputSize(inputArr[0].inputs.length)
                } else {
                    setInputSize(inputArr[0].inputs.length)
                }
            }
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        console.log("Input size",inputSize)
        if (inputSize>0){
            return (
                <div>
                    sjdn
                </div>
            )
        }else {
            return <Button onClick={()=>onDeploy()}>Deploy</Button>
        }
    }
    return <div>Nont found</div>
}

export default withAlert()(RenderMainArguments);