import React, { useState} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {connect} from "react-redux";
import {setUser} from "../../../../reducer/user/user.actions";
import DappsRow from "./DappsRow";
import {Query} from "react-apollo";
import {me_Query} from "../../../../queries/queries";
import {Spinner3} from "../../../ui/Spinner";

const DevelopedDapps = (props) => {
    const [currentUser,setCurrentUser]=useState(null)
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Developed <span>Dapps</span></strong></h1>
            <div className={'scroll'}>
                <Table  className={"violet developed striped "} >
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
                    {currentUser&&currentUser.dApps.length>0&&<DappsRow {...props} dapps={currentUser.dApps}/>}
                </Table>
                {currentUser&&!currentUser.dApps.length>0&&
                    <div className={'zero-result'}>
                        Found 0 Developed Dapps
                    </div>
                }
                <Query query={me_Query} fetchPolicy={'network-only'} onCompleted={
                    data => {
                        setCurrentUser(data.me)
                    }
                }>
                    {({loading,data,error})=>{
                        if (loading) return <Spinner3/>
                        if (error) return <p>{error.toString()}</p>
                        if (data){
                            return <div> </div>
                        }
                    }}
                </Query>
            </div>
        </DashboardLayout>
    );
};

export default connect(null, {setUser})(DevelopedDapps);