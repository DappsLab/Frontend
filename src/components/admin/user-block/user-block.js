import React, {useState} from 'react';
import DashboardLayout from "../../../hoc/DashboardLayout";
import {Tab} from "semantic-ui-react";
import {Query} from "react-apollo";
import {searchUnBLockedUser, searchUnBLockedUsersRequest} from "../../../queries/queries";
import {Spinner3} from "../../ui/Spinner";
import UnBlockRow from "./user-block-row";

const UserBlock = (props) => {
    const [allUser,setAllUsers]=useState(null)
    const [allRequest,setAllRequest]=useState(null)
    const panes = [
        { menuItem: 'All Users', render:()=> getAllUsers() },
        { menuItem: 'UnBloack Request', render:()=>  getAllUnBlockRequest() },
    ]
    const getAllUsers=()=>{
        return  <Query query={searchUnBLockedUser}  fetchPolicy={'network-only'} onCompleted={data => {
            setAllUsers(data.searchUnBlockedUsers)
        }}>
            {({loading,data,error})=>{
                if (loading) return <Spinner3/>
                if (error) return <p>{error.toString()}</p>
                if (data&&allUser){
                    return <UnBlockRow {...props} users={allUser}/>
                }else return <div className={'zero-result'}>Found 0 Request</div>
            }}
        </Query>
    }
    const getAllUnBlockRequest=()=>{
        return  <Query query={searchUnBLockedUsersRequest}  fetchPolicy={'network-only'} onCompleted={data => {
            setAllRequest(data.unBlockRequests)
        }}>
            {({loading,data,error})=>{
                if (loading) return <Spinner3/>
                if (error) return <p>{error.toString()}</p>
                if (data&&allRequest){
                    console.log(data)
                    return <UnBlockRow {...props} request users={allRequest}/>
                }else return <div className={'zero-result'}>Found 0 Request</div>
            }}
        </Query>
    }
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>All <span>Users</span></strong></h1>
            <Tab className={"order_tab"}
                 menu={{fluid: true, tabular: true}}
                 panes={panes}
            />
        </DashboardLayout>
    );
};

export default UserBlock;
