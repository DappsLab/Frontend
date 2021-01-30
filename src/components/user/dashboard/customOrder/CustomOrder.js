import React, {useState} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Tab, } from "semantic-ui-react";
import CustomOrderRow from "./CustomOderRow";
import {Query} from "react-apollo";
import {me_Query,searchCustomOrders} from "../../../../queries/queries";
import {Spinner3} from "../../../ui/Spinner";

const CustomOrder = (props) => {
    const {user}=props
    const [myOrder,setMyOrders]=useState(null)
    const [allOrder,setAllOrders]=useState(null)

    const myOrders=()=>{
       return  <Query query={me_Query}  fetchPolicy={'network-only'} onCompleted={data => {
           setMyOrders(data.me.customOrders)
       }}>
           {({loading,data,error})=>{
               if (loading) return <Spinner3/>
               if (error) return <p>{error.toString()}</p>
               if (data&&myOrder){
                   console.log(data)
                   return <CustomOrderRow {...props} orders={myOrder}/>
               }else return <div>Loading</div>
           }}
       </Query>
    }
    const allOrders=()=>{
       return <Query query={searchCustomOrders}  fetchPolicy={'network-only'} onCompleted={data => {
           setAllOrders(data.searchVerifiedCustomOrders)
       }}>
           {({loading,data,error})=>{
               if (loading) return <Spinner3/>
               if (error) return <p>{error.toString()}</p>
               if (data&&allOrder){
                   return <CustomOrderRow {...props} orders={allOrder}/>

               }else return <div>Loading</div>
           }}
       </Query>
    }
    const panes = [
        { menuItem: 'My Order', render:()=> myOrders() },
        { menuItem: 'Others Order', render:()=>  allOrders() },

    ]
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>Custom orders of <span>Smart Contract/Dapp</span></strong></h1>
            {user.type === 'DEVELOPER' ?
                <Tab className={"order_tab"}
                      menu={{fluid: true, tabular: true}}
                      panes={panes}
                />
                : myOrders()
            }
        </DashboardLayout>
    );
};

export default CustomOrder;