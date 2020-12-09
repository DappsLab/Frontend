import React from 'react';
import {useQuery} from "@apollo/client";
import {pendingDapps} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {Spinner2} from "../../ui/Spinner";
import CollapsibleDappsTable from "../../ui/CollapsibleDappsTable";

const DappsVerification = (props) => {
    const {loading,data,error}=useQuery(pendingDapps,{
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client
    })
    if (loading) return <Spinner2/>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    console.log(data)
    if (data.searchPendingDApps.length>0) return <CollapsibleDappsTable {...props} data={data.searchPendingDApps}/>
    return <div>Empty</div>
};

export default DappsVerification;