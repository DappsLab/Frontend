import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {getTestABI, testDeploy} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";
import {Button, Form, Input} from "semantic-ui-react";
import {withAlert} from "react-alert";
import {getObjects} from "../../../../ui/Helpers";

const RenderArguments = (props) => {
    const {license,fee,name,alert}=props
    const newID=license.testCompilations[license.testCompilations.length - 1].id;
    const [inputSize,setInputSize]=useState(0)
    const [argument,setArgument]=useState([])



    const [deploy]=useMutation(testDeploy,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onCompleted:data1 => {
            console.log("test deploy :",data1)
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:3000})
            console.log(error1.toString())
        }
    })
    const onTestDeploy=()=>{
        const input= {}
        input["testCompiledContractId"] = newID
        input["testAddressId"]=license.testOrder.testAddress.id
        input['deplopmentLabel']=name
        input['fee']=fee
        if (inputSize>0){
            // argumentsArray:''
        }
        deploy({
            variables:{
                input:input
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }
    const handleChange=(event,index,name,ty)=>{
        const {value}=event.target
        argument[index]=event.target.value
        console.log(index,value,name,ty)
        setArgument(argument)
    }
    const {data,error,loading}=useQuery(getTestABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:newID
        },onCompleted:data1 => {
            const abi=JSON.parse(data1.testGetABI);
            const inputArr=getObjects(abi,"type","constructor")
            if (inputArr.length>0) {
                if (inputArr[0].inputs.length > 0) {
                    console.log("array",inputArr[0].inputs)
                    setArgument(inputArr[0].inputs)
                    setInputSize(inputArr[0].inputs.length)
                } else {
                    setInputSize(inputArr[0].inputs.length)
                }
            }
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data&&!loading) {
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
                    <Button className={'deploy_btn'} onClick={()=>onTestDeploy()}>Deploy</Button>
                </Form>
            )
        }else {
            return <Button className={'deploy_btn'} onClick={()=>onTestDeploy()}>Deploy</Button>
        }
    }
    return <div>Nont found</div>
};

export default withAlert()(RenderArguments);