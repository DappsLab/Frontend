import React, {useEffect, useState} from 'react';
import web3 from 'web3';
import {loadContract} from "../../../../ui/ContractInteractionHelper";
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
    const address=deploy[deploymentLength-1].contractAddress;
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
       let contract=loadContract(abi, address)
        console.log(JSON.parse(abi))
        const inputArr=getObjects(JSON.parse(abi),"type","function");
        console.log(inputArr)
        console.log(onwerAddress)
        console.log(contract)
        return <div>sdf</div>
    }
    return (
        <div>

        </div>
    );
};

export default TestIntract;
