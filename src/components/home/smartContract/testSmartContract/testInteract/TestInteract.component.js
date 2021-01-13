import React, {useEffect, useState} from 'react';
import {callContract, loadContract, sendContractValue} from "../../../../ui/ContractInteractionHelper";
import {useQuery} from "@apollo/client";
import {getTestABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {getObjects} from "../../../../ui/Helpers";

const TestIntract = (props) => {
    const [abi,setAbi]=useState();
    const {license}=props
    const newID = license.testCompilations[license.testCompilations.length - 1].id;
    const deploymentLength=license.testCompilations[license.testCompilations.length - 1].testDeployments.length;
    const deploy=license.testCompilations[license.testCompilations.length - 1].testDeployments
    const contractAddress=deploy[deploymentLength-1].contractAddress;
    const onwerAddress=deploy[deploymentLength-1].ownerAddress;
    const {data,error,loading}=useQuery(getTestABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:newID
        },onError:error1 => {
            props.setLoading(false)
        },onCompleted:data1 => {
            setAbi(data.testGetABI)
        }
    })
    if (error) return <p>{error.toString()}</p>
    if (data&&!loading&&abi) {
       let contract=loadContract(abi, contractAddress)
        console.log(JSON.parse(abi))
        const inputArr=getObjects(JSON.parse(abi),"type","function");
        const interfaceFuncation=contract._jsonInterface;
        return <div>
            {interfaceFuncation.map((result,index)=>{
                if (result.inputs.length>0){
                    return <div key={index} >nothing</div>
                }else{
                    return <button className={'Interact_button'} onClick={
                        async ()=>{

                            if (result.stateMutability==='view') {
                                let callData = await callContract(contract, result, result.name, onwerAddress);
                                console.log(callData)
                            }
                            else if (result.stateMutability==="nonpayable"||result.stateMutability==="payable"){
                                let callData = await sendContractValue(contract,result.stateMutability ,result.name, onwerAddress);
                                console.log(callData)
                            }
                        }
                    } key={index}>{result.name}</button>
                }
            })}
        </div>
    }
    return (
        <div>Error Refresh</div>
    );
};

export default TestIntract;
