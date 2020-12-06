import React from 'react';
import {Spinner2} from "../../ui/Spinner";
import { pendingSmartContract} from "../../../queries/queries";
import CollapsibleFormTable from "../../ui/CollapsibleTableForm";
import {  useQuery } from '@apollo/client';

const SmartContractVerification = (props) => {
    const {loading,error,data}=useQuery(pendingSmartContract);
    if (loading) return <Spinner2/>
    if (error) return <div className={"errorMessage"}>{error.toString()}</div>
    if (data.searchPendingSmartContracts.length>0) return <CollapsibleFormTable {...props} data={data.searchPendingSmartContracts}/>
    return <div>Empty</div>
};

export default SmartContractVerification;