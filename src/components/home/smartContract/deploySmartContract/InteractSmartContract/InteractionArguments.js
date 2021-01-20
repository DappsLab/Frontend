import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {getABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {
    callMainContract,
     loadMainContract,
    sendMainContractValue
} from "../../../../ui/ContractInteractionHelper";
import {FormValidation} from "../../../../ui/mise";
import {withAlert} from "react-alert";

const IntractArguments = (props) => {
    const [name,setName]=useState('');
    const [value,setValue]=useState('');
    const [payableValue,setPayableValue]=useState('');
    const [sendValue,setSendValue]=useState('');
    const [abi,setAbi]=useState();
    const {newID,ownerAddress,ownerKey,contractAddress,alert}=props
    const handleSelect=(event)=>{
        const {value}=event.target;
        if (value==='Select Funtion'){
            setName('')
        }else {
            setName(value)
        }
    }
    const onFunctionSubmit=async (targetArray,contract)=>{

        if (targetArray.stateMutability==='view') {
            let callData = await callMainContract(contract, targetArray, targetArray.name, ownerAddress);
            setValue(callData)
        }
        else if (targetArray.stateMutability==="nonpayable"){
            let callData = await sendMainContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress);
            console.log("SendMainContractValue",callData)
        }else if (targetArray.stateMutability==="payable"||targetArray.payable){
           if (payableValue.length>1){
               let callData = await sendMainContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress,payableValue);
               // console.log("SendMainContractValue",callData)
           }else {
               alert.error("Enter Value", {timeout:1000})
           }
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
            console.log('target Array',tagertArray)
            if (tagertArray.inputs.length>0){
                return <div>Input</div>
            }else {
                return <div>
                    {tagertArray.payable||tagertArray.stateMutability==='payable'?(
                        <form>
                            <label>Enter paybale Value</label>
                            <input type={'text'}  name={'payable'} value={payableValue} onChange={(event)=>{
                                setPayableValue(FormValidation(payableValue,event.target.value,event.target.name))
                            }}/>
                            <p>This funcation is payably</p>
                            <label>Enter Sender </label>
                            <input type={'text'} name={'send'} value={sendValue} onChange={(event)=>{
                                setSendValue(event.target.value)
                            }}/>
                            <p>This funcation is payably</p>
                        </form>
                        ):""}
                    <button className={'Interact_button'} onClick={()=>onFunctionSubmit(tagertArray,contract)} >Execute</button>
                </div>
            }
        }
    }
    const renderResult=(array)=>{
        if (value!=='') {
            // console.log(array)
            // let tagertArray
            // for (let i=0;i<array.length;i++){
            //     if (array[i].name===name){
            //         tagertArray=array[i]
            //         break;
            //     }
            // }
            // console.log("Taget Array",tagertArray)
            return   <div className={'execute-result'}>
                <h3>Result</h3>
                {value}
            </div>
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
        },onError:error1 => {
            console.log(error1.toString())
            // props.setLoading(false)
        },onCompleted:data1 => {
            setAbi(data.getABI)
        }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.toString()}</p>
    if (data&&!loading&&abi) {
        let contract=loadMainContract(abi, contractAddress)
        // console.log("loaded contract",contract)
        // const inputArr=getObjects(JSON.parse(abi),"type","function");
        const functionArrays=contract._jsonInterface;
        console.log('functions',functionArrays)
        return <div>
            <form>
                <select onClick={(event)=>handleSelect(event)}>
                    <option>Select Funtion</option>
                    {
                        functionArrays.map((functionArr,index)=>(
                            <option key={index} >{functionArr.name}</option>
                        ))
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

export default withAlert() (IntractArguments);
