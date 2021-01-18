import React from 'react';
import {pending_kyc_query} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleTable from "../../ui/CollapsibleTable";
import { useQuery} from "@apollo/client";
import {Client} from "../../../queries/Services";
import DashboardLayout from "../../../hoc/DashboardLayout";



const KycVerification =(props)=> {

    const {loading, error, data} = useQuery(pending_kyc_query, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client: Client,fetchPolicy:'network-only'
    })
    if (loading) return  <DashboardLayout user={props.user}>
        <Spinner2/>
    </DashboardLayout>
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