import React from 'react';
import {pending_kyc_query} from "../../../queries/queries";
import { Spinner3} from "../../ui/Spinner";
import CollapsibleTable from "../../ui/CollapsibleTable";
import DashboardLayout from "../../../hoc/DashboardLayout";
import {Query} from "react-apollo";



const KycVerification =(props)=> {

    // const {loading, error, data} = useQuery(pending_kyc_query, {
    //     context: {
    //         headers: {
    //             authorization: localStorage.getItem("token")
    //         }
    //     },
    //     client: Client,fetchPolicy:'network-only'
    // })
    // if (loading) return  <DashboardLayout user={props.user}>
    //     <Spinner2/>
    // </DashboardLayout>
    // if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    // if (data.searchPendingKyc.length > 0) return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>KYC Verification</span></strong></h1>
    //     <CollapsibleTable {...props} data={data.searchPendingKyc}/>
    // </DashboardLayout>
    // return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>KYC Verification</span></strong></h1>
    //     <div>Empty</div>
    // </DashboardLayout>
    return(
        <DashboardLayout user={props.user}>
            <h1><strong>Pending <span>KYC Verification</span></strong></h1>
            <Query query={pending_kyc_query} fetchPolicy={'network-only'}>
                {({loading,refetch,data,error})=>{
                    if (loading) return <Spinner3/>
                    if (error) return <p>{error.toString()}</p>
                    if (data){
                        if (data.searchPendingKyc.length>0){
                            return (
                                <CollapsibleTable {...props} fetch={refetch} data={data.searchPendingKyc}/>
                            )
                        }else {
                            return (
                                <div>No Pending KYC Varifections </div>
                            )
                        }
                    }
                }}
            </Query>
        </DashboardLayout>
    )
}

export default (KycVerification);