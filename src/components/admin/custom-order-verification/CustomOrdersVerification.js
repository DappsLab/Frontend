import React from 'react';
import DashboardLayout from "../../../hoc/DashboardLayout";
import {Query} from "react-apollo";
import {pendingCustomOrders} from "../../../queries/queries";
import {Spinner3} from "../../ui/Spinner";
import CollapsibleCustomOrderTabel from "../../ui/admin-tables/CollapsibleCustomOrderTabel";

const CustomOrderVerification = (props) => {
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Pending <span>Custom Orders</span></strong></h1>
            <Query query={pendingCustomOrders} fetchPolicy={'network-only'}>
                {({loading,refetch,data,error})=>{
                    if (loading) return <Spinner3/>
                    if (error) return <p>{error.toString()}</p>
                    if (data){
                        if (data.searchPendingCustomOrders.length>0){
                            return (
                                <CollapsibleCustomOrderTabel {...props} fetch={refetch} data={data.searchPendingCustomOrders}/>
                            )
                        }else {
                            return (
                                <div className={'zero-result'}>0 Pending Dapps </div>
                            )
                        }
                    }
                }}
            </Query>
        </DashboardLayout>
    );
};

export default CustomOrderVerification;
