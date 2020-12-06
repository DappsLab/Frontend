import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import { Table} from 'semantic-ui-react'
import {connect} from "react-redux";
import PurchasedRow from "./PurchasedRow";
import Admin from "../../../admin/Admin";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import { ApolloProvider } from '@apollo/client';
class Purchased extends Component {
    state={
        currentUser:this.props.user===null?this.props.currentUser:this.props.user
    }
     Authclient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization:localStorage.getItem('token'),
        }
    });
    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                currentUser: this.props.currentUser
            });
        }
    }
    render() {
        const {currentUser}=this.state;
        return (
            <DashboardLayout>
                <Table selectable className={"violet striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell  width={7}> Contract Name</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Customized Left</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        {<PurchasedRow {...this.props} purchased={currentUser.purchasedContracts}/>}
                </Table>
                {currentUser.type === "ADMIN" &&
                <ApolloProvider client={this.Authclient}>
                <Admin {...this.props} currentUser={currentUser}/>
                </ApolloProvider>
                }
            </DashboardLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default connect(mapStateToProps)(Purchased);