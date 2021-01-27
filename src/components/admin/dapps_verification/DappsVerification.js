import React from 'react';
import {Query} from "react-apollo";
import {pendingDapps} from "../../../queries/queries";
import { Spinner3} from "../../ui/Spinner";
import CollapsibleDappsTable from "../../ui/admin-tables/CollapsibleDappsTable";
import DashboardLayout from "../../../hoc/DashboardLayout";

const DappsVerification = (props) => {
    // const {loading, data, error} = useQuery(pendingDapps, {
    //     context: {
    //         headers: {
    //             authorization: localStorage.getItem("token")
    //         }
    //     },
    //     client: Client,fetchPolicy:'network-only'
    //     })
    // if (loading) return  <DashboardLayout user={props.user}>
    //     <Spinner2/>
    // </DashboardLayout>
    // if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    // if (data.searchPendingDApps.length > 0) return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>Dapps</span></strong></h1>
    //     <CollapsibleDappsTable {...props} data={data.searchPendingDApps}/>
    // </DashboardLayout>
    // return <DashboardLayout user={props.user}>
    //     <h1><strong>Pending <span>Dapps</span></strong></h1>
    //     <p>Empty</p>
    // </DashboardLayout>
    return(
        <DashboardLayout user={props.user}>
            <h1><strong>Pending <span>Dapps</span></strong></h1>
            <Query query={pendingDapps} fetchPolicy={'network-only'}>
                {({loading,refetch,data,error})=>{
                    if (loading) return <Spinner3/>
                    if (error) return <p>{error.toString()}</p>
                    if (data){
                        if (data.searchPendingDApps.length>0){
                            return (
                                <CollapsibleDappsTable {...props} fetch={refetch} data={data.searchPendingDApps}/>
                            )
                        }else {
                            return (
                                <div>No Pending Dapps </div>
                            )
                        }
                    }
                }}
            </Query>
        </DashboardLayout>
    )
}
export default DappsVerification;