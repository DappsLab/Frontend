import React from 'react';
import {pending_kyc_query} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleTable from "../../ui/CollapsibleTable";
import { useQuery} from "@apollo/client";



const KycVerification =(props)=> {
    const {loading,error,data}=useQuery(pending_kyc_query)
    if (loading) return <Spinner2/>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    if (data.searchPendingKyc.length>0) return <CollapsibleTable {...props} data={data.searchPendingKyc}/>
    return <div>Empty</div>
}

export default (KycVerification);