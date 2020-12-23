import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {getTestABI, testDeploy} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";
import {Button} from "semantic-ui-react";
import {withAlert} from "react-alert";

const RenderArguments = (props) => {
    const {license,alert}=props
    const newID=license.testCompilations[license.testCompilations.length - 1].id;
    const [inputSize,setInputSize]=useState(0)

    function getObjects(obj, key, val) {
        let objects = [];
        for (const i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else
            if (i === key && obj[i] === val || i === key && val === '') {
                objects.push(obj);
            } else if (obj[i] === val && key === ''){
                if (objects.lastIndexOf(obj) === -1){
                    objects.push(obj);
                }
            }
        }
        return objects;
    }

    const [deploy]=useMutation(testDeploy,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:3000})
        }
    })
    const onTestDeploy=()=>{
        const input= {}
        input["testCompiledContract"] = newID
        input["testAddressId"]=license.testOrder.testAddress.id
        if (inputSize>0){
            // argumentsArray:''
        }
        console.log("inputs",input)
        deploy({
            variables:{
                input:input
            }
        }).catch(err=>{
            console.log(err.toString())
        })
        console.log("sdfd")
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
            if (inputArr[0].inputs.length>0){
                console.log(inputArr)
            }else {
                setInputSize(inputArr[0].inputs.length)
            }
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        console.log(data)
        console.log(inputSize)
        if (inputSize>0){
            return (
                <div>
                    sjdn
                </div>
            )
        }else {
            return <Button onClick={()=>onTestDeploy()}>Deploy</Button>
        }
    }
    return <div>Nont found</div>
};

export default withAlert()(RenderArguments);