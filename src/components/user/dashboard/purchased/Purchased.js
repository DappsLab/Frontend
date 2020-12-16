import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import { Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import PurchasedRow from "./PurchasedRow";
import Admin from "../../../admin/Admin";
import {ApolloClient, InMemoryCache, useQuery} from "@apollo/client";
import { ApolloProvider } from '@apollo/client';
import {setUser} from "../../../../actions/Actions";
import {me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";

const Purchased =(props)=> {

     const Authclient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization:localStorage.getItem('token'),
        }
    });
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
         if (data) {
             const currentUser=data.me
             return (<div>
                     <Table selectable className={"violet striped "}>
                         <Table.Header>
                             <Table.Row>
                                 <Table.HeaderCell width={1}>No </Table.HeaderCell>
                                 <Table.HeaderCell width={7}> Contract Name</Table.HeaderCell>
                                 <Table.HeaderCell width={1}>Customized Left</Table.HeaderCell>
                             </Table.Row>
                         </Table.Header>
                         {<PurchasedRow {...props} purchased={currentUser.purchasedContracts}/>}
                     </Table>
                     {currentUser.type === "ADMIN" &&
                     <ApolloProvider client={Authclient}>
                         <Admin {...props} currentUser={currentUser}/>
                     </ApolloProvider>
                     }
                 </div>
             )
         }
         return <div>Not found</div>
     }
     return (
            <DashboardLayout>
                {RenderData()}
            </DashboardLayout>
        );
}

export default connect( null,{setUser})(Purchased);