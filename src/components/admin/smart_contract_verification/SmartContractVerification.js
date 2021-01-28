import React from 'react';
import { Spinner3} from "../../ui/Spinner";
import { pendingSmartContract} from "../../../queries/queries";
import DashboardLayout from "../../../hoc/DashboardLayout";
import {Query} from "react-apollo";
import CollapsibleContractFormTable from "../../ui/admin-tables/CollapsibleContractTableForm";


const SmartContractVerification = (props) => {
    // const {loading, error, data} = useQuery(pendingSmartContract, {
    //     context: {
    //         headers: {
    //             authorization: localStorage.getItem("token")
    //         }
    //     },fetchPolicy:'network-only',
    //     client: Client
    //     });
    // if (loading) return  <DashboardLayout user={props.user}>
    //     <Spinner2/>
    // </DashboardLayout>
    // if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    // if (data.searchPendingSmartContracts.length > 0) return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>Smart Contract</span></strong></h1>
    //     <CollapsibleFormTable {...props} data={data.searchPendingSmartContracts}/>
    // </DashboardLayout>
    // return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>Smart Contract</span></strong></h1>
    //     <div>Empty</div>
    // </DashboardLayout>
    //
    return(
        <DashboardLayout user={props.user}>
            <h1><strong>Pending <span>Smart Contract</span></strong></h1>
            <Query query={pendingSmartContract} fetchPolicy={'network-only'}>
                {({loading,refetch,data,error})=>{
                    if (loading) return <Spinner3/>
                    if (error) return <p>{error.toString()}</p>
                    if (data){
                        if (data.searchPendingSmartContracts.length>0){
                            return (
                                <CollapsibleContractFormTable {...props} fetch={refetch} data={data.searchPendingSmartContracts}/>
                            )
                        }else {
                            return (
                                <div>No Pending Smart Contract </div>
                            )
                        }
                    }
                }}
            </Query>
        </DashboardLayout>
    )
};


export default SmartContractVerification;