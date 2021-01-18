import React from 'react';
import {useQuery} from "@apollo/client";
import {pendingDapps} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleDappsTable from "../../ui/CollapsibleDappsTable";
import DashboardLayout from "../../../hoc/DashboardLayout";

const DappsVerification = (props) => {

    const {loading, data, error} = useQuery(pendingDapps, {
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
    if (data.searchPendingDApps.length > 0) return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Dapps</span></strong></h1>
        <CollapsibleDappsTable {...props} data={data.searchPendingDApps}/>
    </DashboardLayout>
    return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Dapps</span></strong></h1>
        <p>Empty</p>
    </DashboardLayout>
}
export default DappsVerification;