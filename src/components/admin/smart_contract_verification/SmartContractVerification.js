import React, {useEffect} from 'react';
import {Spinner2} from "../../ui/Spinner";
import { pendingSmartContract} from "../../../queries/queries";
import CollapsibleFormTable from "../../ui/CollapsibleTableForm";
import {  useQuery } from '@apollo/client';
import {Client} from "../../../queries/Services";
import DashboardLayout from "../../../hoc/DashboardLayout";


const SmartContractVerification = (props) => {
    useEffect(()=>{
        refetch();
    },[])
    const {loading, error, data,refetch} = useQuery(pendingSmartContract, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client: Client
        });
    if (loading) return <div className={'main-spinner'}><Spinner2/></div>
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