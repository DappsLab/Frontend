import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {pendingDapps} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleDappsTable from "../../ui/CollapsibleDappsTable";
import DashboardLayout from "../../../hoc/DashboardLayout";

const DappsVerification = (props) => {
    useEffect(()=>{
        refetch();
    },[])
    const {loading, data, error, refetch} = useQuery(pendingDapps, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client: Client,
        })
    if (loading) return <Spinner2/>

    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    if (data.searchPendingDApps.length > 0) return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Dapps</span></strong></h1>
        <CollapsibleDappsTable {...props} data={data.searchPendingDApps}/>
    </DashboardLayout>
    return <DashboardLayout user={props.user}>
        <h1><strong>Pending <span>Dapps</span></strong></h1>
        <div>Empty</div>
    </DashboardLayout>
}
export default DappsVerification;