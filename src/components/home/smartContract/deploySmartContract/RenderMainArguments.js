import React, {useState} from 'react';
import {withAlert} from "react-alert";
import {useMutation, useQuery} from "@apollo/client";
import {getABI, deploy} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {getObjects} from "../../../ui/Helpers";
import {Button, Form, Input} from "semantic-ui-react";
import {CheckDimension, convertArrayToObject} from "../../../ui/mise";
import {recursiveChecker} from "../../../ui/InputValidation";

const RenderMainArguments = (props) => {
    const {license,name,alert}=props
    const newID=license.compilations[license.compilations.length - 1].id;
    const type=license.purchasedContract.unlimitedCustomization;
    const [inputSize,setInputSize]=useState(0)
    const [argument,setArgument]=useState([])
    const [errors,setError]=useState(false)

    const handleChange=(event,index,name,ty)=>{
        const {value}=event.target
        argument[index].data=value
        // console.log(index,value,name,ty)
        setArgument(argument)
    }

    const handleDeploy=()=>{

        const input= {}
        input["compiledContractId"] = newID
        // input["addressId"]=license.order.address
        input['unlimitedCustomization']=type
        input['deplopmentLabel']=name
        // input['fee']=fee.toString()
        if (inputSize>0){
            let final =[]
            for (let i=0;i<argument.length;i++){
                let array=[]
                let argument_array={}
                const count=CheckDimension(argument[i].type);
                let value=argument[i].data
                if (count===2){

                }else if (count===1){
                    let split=value.split(',')
                    for (let i=0;i<split.length;i++){
                        array.push(split[i])
                    }
                    argument_array['dataType']=argument[i].type.toString()
                    argument_array['index']=i
                    argument_array['data']=split
                    final.push(argument_array)
                }else {
                    array.push(value)
                    argument_array['dataType']=argument[i].type.toString()
                    argument_array['index']=i
                    argument_array['data']=array
                    final.push(argument_array)
                }
            }
            console.log(convertArrayToObject(final,'index'))
            input['argumentsArray']=final
        }
        console.log("INPUT",input)
        deployMutate({
            variables:{
                input:input
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }
    const [deployMutate]=useMutation(deploy,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onCompleted:data1 => {
            alert.success("Deploy Successfull")
            props.history.push(`/interact_smart_contract/${license.id}`)

        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:3000})
            console.log(error1.toString())
        }
    })
    const handleBlur=(event,index,name,ty)=>{
        const {value}=event.target
        let array=[]
        const count=CheckDimension(ty);
        if (count===2){

        }else if (count===1){
            let split=value.split(',')
            for (let i=0;i<split.length;i++){
                array.push(split[i])
            }
        }else {
            array.push(value)
        }

        if (value.length>0) {
            if (recursiveChecker(ty,array)){
                argument[index].error = false;
                setError(!errors)
            }else {
                argument[index].error = true
                setError(true)
                alert.error("INVALID_ARGUMENT", {timeout: 2000})
            }
        }else {
            argument[index].error = false;
            setError(!errors)
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
                    setArgument(inputArr[0].inputs)
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
                                <label>{argu.name}</label>  <span className={'info'}>{argu.type} {
                                CheckDimension(argu.type)===2?
                                    "Enter Data in Json"
                                    :(CheckDimension(argu.type)===1?
                                        "Separate data by ,":""
                                    )
                            }</span>
                                <Input
                                    name={argu.name}  type={'text'} error={argu.error} onBlur={(event)=>handleBlur(event,index,argu.name,argu.type)}
                                    onChange={(event)=>handleChange(event,index,argu.name,argu.type)}
                                />
                            </Form.Field>
                        })
                    }
                    <Button className={'deploy_btn'} onClick={()=>handleDeploy()}>Deploy</Button>
                </Form>
            )
        }else {
            return <Button className={'deploy_btn'} onClick={()=>handleDeploy()}>Deploy</Button>
        }
    }
    return <div>Not found</div>
}

export default withAlert()(RenderMainArguments);