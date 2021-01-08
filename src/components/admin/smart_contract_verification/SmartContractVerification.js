import React, {useEffect} from 'react';
import {Spinner2} from "../../ui/Spinner";
import { pendingSmartContract} from "../../../queries/queries";
import CollapsibleFormTable from "../../ui/CollapsibleTableForm";
import {  useQuery } from '@apollo/client';
import {Client} from "../../../queries/Services";
import DashboardLayout from "../../../hoc/DashboardLayout";


const SmartContractVerification = (props) => {
    console.log(props)
    useEffect(()=>{
        refetch();
    },[])
    const {loading, error, data,refetch} = useQuery(pendingSmartContract, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },fetchPolicy:'network-only',
        client: Client
        });
    if (loading) return  <DashboardLayout user={props.user}>
        <Spinner2/>
    </DashboardLayout>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    if (data.searchPendingSmartContracts.length > 0) return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Smart Contract</span></strong></h1>
        <CollapsibleFormTable {...props} data={data.searchPendingSmartContracts}/>
    </DashboardLayout>
    return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Smart Contract</span></strong></h1>
        <div>Empty</div>
    </DashboardLayout>
};


export default SmartContractVerification;