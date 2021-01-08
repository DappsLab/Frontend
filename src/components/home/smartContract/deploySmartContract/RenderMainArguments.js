import React, {useState} from 'react';
import {withAlert} from "react-alert";
import {useQuery} from "@apollo/client";
import {getABI} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {getObjects} from "../../../ui/Helpers";
import {Spinner2} from "../../../ui/Spinner";
import {Button, Form, Input} from "semantic-ui-react";

const RenderMainArguments = (props) => {
    const {license,fee,name,alert}=props
    const newID=license.compilations[license.compilations.length - 1].id;
    const [inputSize,setInputSize]=useState(0)
    const [argument,setArgument]=useState([])


    const handleChange=(event,index,name,ty)=>{
        const {value}=event.target
        argument[index]=event.target.value
        console.log(index,value,name,ty)
        setArgument(argument)
    }
    const onDeploy=()=>{
        const input= {}
        input["testCompiledContractId"] = newID
        input["testAddressId"]=license.order.testAddress.id
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
    if (loading) return "Please Wait Loading"
    if (error) return <div>{error.toString()}</div>
    if (data&&!loading) {
        console.log("Input size",inputSize)
        if (inputSize>0){
            return (
                <Form className={'arguments'}>
                    {
                        argument.map((argu,index)=>{
                            return <Form.Field  key={index}>
                                <label>{argu.name}</label>
                                <Input
                                    name={argu.name}  type={'text'}
                                    onChange={(event)=>handleChange(event,index,argu.name,argu.type)}
                                />
                            </Form.Field>
                        })
                    }
                    <Button className={'deploy_btn'} onClick={()=>onDeploy()}>Deploy</Button>
                </Form>
            )
        }else {
            return <Button className={'deploy_btn'} onClick={()=>onDeploy()}>Deploy</Button>
        }
    }
    return <div>Nont found</div>
}

export default withAlert()(RenderMainArguments);