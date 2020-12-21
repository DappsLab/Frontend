import React, {useEffect} from 'react';
import {pending_kyc_query} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleTable from "../../ui/CollapsibleTable";
import { useQuery} from "@apollo/client";
import {Client} from "../../../queries/Services";
import DashboardLayout from "../../../hoc/DashboardLayout";



const KycVerification =(props)=> {
    useEffect(()=>{
        refetch();
    },[])
    const {loading, error, data,refetch} = useQuery(pending_kyc_query, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client: Client
    })
    if (loading) return <div className={'main-spinner'}><Spinner2/></div>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    if (data.searchPendingKyc.length > 0) return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>KYC Verification</span></strong></h1>
        <CollapsibleTable {...props} data={data.searchPendingKyc}/>
    </DashboardLayout>
    return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>KYC Verification</span></strong></h1>
        <div>Empty</div>
    </DashboardLayout>
}

export default (KycVerification);