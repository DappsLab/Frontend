import React from 'react';
import {useQuery} from "@apollo/client";
import {getCompiler} from "../../../queries/queries";
import {Client} from "../../../queries/Services";

const GetVersion = (props) => {
    const {data,loading,error}=useQuery(getCompiler,{
        client:Client
    })
    if (loading) return "Loading"
    if (error) return error.toString()
    if (data) {
        return (
            <form className={'test-address'}>
                <label>Compiler Version</label>
                <select placeholder={'Select Version'} className={'strock'}
                        onChange={(event)=>props.onContractVersion(event)}>
                    <option value={'select'}>{props.value?props.value:"Select Compiler Version"}</option>
                    {data.getCompilerVersions.map(version=>{
                        return <option key={version} value={version} >{version}</option>
                    })}
                </select>
            </form>
        );
    }
    return "NOt found Referesh Page"
};

export default GetVersion;