import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {pendingDapps} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleDappsTable from "../../ui/CollapsibleDappsTable";

const DappsVerification = (props) => {
    const {loading,data,error,refetch}=useQuery(pendingDapps,{
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,

    })
    if (loading) return <Spinner2/>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>

    if (data.searchPendingDApps.length>0) return <CollapsibleDappsTable {...props} data={data.searchPendingDApps}/>
    return <div>Empty</div>
};

export default DappsVerification;