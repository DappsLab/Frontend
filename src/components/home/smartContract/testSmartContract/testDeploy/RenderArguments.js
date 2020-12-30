import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {getTestABI, testDeploy} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";
import {Button} from "semantic-ui-react";
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
            console.log(data1)
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
    const getType =(type)=>{
        if (type==="bytes32[]"){

        }
    }
    const handleChange=(event,index)=>{
        argument[index]=event.target.value
        setArgument(argument)
    }
    console.log(argument)
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
    if (data) {
        if (inputSize>0){
            console.log("Input size",inputSize)
            return (
                <form>
                    {
                        argument.map((argu,index)=>{
                             return <input
                                 key={index} name={argu.name}  type={'text'}
                                 onChange={(event,index)=>handleChange(event,argu.type,index)}
                             />

                        })
                    }
                </form>
            )
        }else {
            console.log("Input size in Else",inputSize)
            return <Button onClick={()=>onTestDeploy()}>Deploy</Button>
        }
    }
    return <div>Nont found</div>
};

export default withAlert()(RenderArguments);