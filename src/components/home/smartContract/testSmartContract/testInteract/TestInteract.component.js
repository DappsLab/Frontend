import React, {useEffect, useState} from 'react';
import {
     callMainContract,
     loadMainContract,
    sendMainContractValue
} from "../../../../ui/ContractInteractionHelper";
import {useQuery} from "@apollo/client";
import {getTestABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {getObjects} from "../../../../ui/Helpers";

const TestIntract = (props) => {
    const [name,setName]=useState('');
    const [value,setValue]=useState('');
    const [abi,setAbi]=useState();
    const {license,newID,ownerAddress,ownerKey,contractAddress}=props

    const onFunctionSubmit=async (targetArray,contract)=>{
        if (targetArray.stateMutability==='view') {
            let callData = await callMainContract(contract, targetArray, targetArray.name, ownerAddress);
            setValue(callData)
        }
        else if (targetArray.stateMutability==="nonpayable"||targetArray.stateMutability==="payable"){
            let callData = await sendMainContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress);
            console.log(callData)
        }
    }
    const handleSelect=(event)=>{
        const {value}=event.target;
        if (value==='Select Funtion'){
            setName('')
        }else {
            setName(value)
        }
    }
    const renderData=(array,contract)=>{
        if (name.length>0) {
            let tagertArray
            for (let i=0;i<array.length;i++){
                if (array[i].name===name){
                    tagertArray=array[i]
                    break;
                }
            }
            if (tagertArray.inputs.length>0){
                console.log('input',tagertArray)
                return <div>Input</div>
            }else {
                return <button className={'Interact_button'} onClick={()=>onFunctionSubmit(tagertArray,contract)} >Execute</button>
            }
        }
    }
    const renderResult=(array)=>{
        if (value.length>0) {
            let tagertArray
            for (let i=0;i<array.length;i++){
                if (array[i].name===name){
                    tagertArray=array[i]
                    break;
                }
            }
         return   <div className={'execute-result'}>
             <h3>Result</h3>
                {value}
            </div>
        }
    }
    const {data,error,loading}=useQuery(getTestABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:newID
        },onError:error1 => {
            console.log(error1.toString())
            // props.setLoading(false)
        },onCompleted:data1 => {
            setAbi(data.testGetABI)
        }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.toString()}</p>
    if (data&&!loading&&abi) {
       let contract=loadMainContract(abi, contractAddress)
        console.log(contract)
        const inputArr=getObjects(JSON.parse(abi),"type","function");
        const functionArrays=contract._jsonInterface;
        return <div>
            <form>
                <select onClick={(event)=>handleSelect(event)}>
                    <option>Select Funtion</option>
                    {
                        functionArrays.map(((functionArr,index)=>(
                            <option key={index} >{functionArr.name}</option>
                        )))
                    }
                </select>
            </form>
            {renderData(functionArrays,contract)}
            {renderResult(functionArrays)}
        </div>
    }
    return (
        <div>Error Refresh</div>
    );
};

export default TestIntract;
