import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {getABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {callContract, loadContract, sendContractValue} from "../../../../ui/ContractInteractionHelper";

const IntractArguments = (props) => {
    const [name,setName]=useState('');
    const [value,setValue]=useState('');
    const [abi,setAbi]=useState();
    const {newID,ownerAddress,ownerKey,contractAddress}=props
    console.log(name,value)
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
            let callData = await callContract(contract, targetArray, targetArray.name, ownerAddress);
            setValue(callData)
        }
        else if (targetArray.stateMutability==="nonpayable"||targetArray.stateMutability==="payable"){
            let callData = await sendContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress);
            console.log(callData)
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
        let contract=loadContract(abi, contractAddress)
        console.log(contract)
        // const inputArr=getObjects(JSON.parse(abi),"type","function");
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
            {/*{renderData(functionArrays,contract)}*/}
            {/*{renderResult(functionArrays)}*/}
        </div>
    }
    return (
        <div>Error Refresh</div>
    );
};

export default IntractArguments;
