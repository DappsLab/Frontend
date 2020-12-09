import React from 'react';
import Layout from "../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {dappsbyid} from "../../../../queries/queries";

const DappsDetails = (props) => {

    const RenderData=()=> {
        const {loading, error, data} = useQuery(dappsbyid, {
            client: Client,
            variables: {id: props.match.params.id},
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            console.log(data.dAppById)
            return <div>{data.dAppById.id}</div>
        }
    }

        // console.log(data, dAppById)
    return (
        <Layout>
            {RenderData()}
        </Layout>
    );
};

export default DappsDetails;