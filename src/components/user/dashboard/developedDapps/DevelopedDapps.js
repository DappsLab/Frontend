import React from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Table} from "semantic-ui-react";
import DevelopContractRow from "../developedContract/DevelopContractRow";
import {connect} from "react-redux";
import {setUser} from "../../../../actions/Actions";
import DappsRow from "./DappsRow";

const DevelopedDapps = (props) => {
    const RenderData=()=> {
        const {loading, error, data} = useQuery(me_Query, {
            client: Client,
            onCompleted: data1 => {
                props.setUser(data1.me);
            }, onError: error1 => {
                alert.error(error1.toString(), {timeout: 5000})
            },
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        });
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        return <Table className={"violet developed striped "} >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}>No </Table.HeaderCell>
                    <Table.HeaderCell > Dapps Name</Table.HeaderCell>
                    <Table.HeaderCell >Single Price</Table.HeaderCell>
                    <Table.HeaderCell >Created Date</Table.HeaderCell>
                    <Table.HeaderCell >Status</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <DappsRow smartContracts={data.me.dApps}/>
        </Table>
    }

    return (
        <DashboardLayout>
            {RenderData()}
        </DashboardLayout>
    );
};

export default connect(null, {setUser})(DevelopedDapps);