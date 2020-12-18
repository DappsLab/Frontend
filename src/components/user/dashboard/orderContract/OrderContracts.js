import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import OrderRow from "./OrderRow";

class OrderContracts extends Component {
    render() {
        return (
            <DashboardLayout user={this.props.user}>
                <h1><strong>Ordered <span>Contract & Dapps</span></strong></h1>
                <div className={'scroll'}>
                <Table className={"violet striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell > Contract Name</Table.HeaderCell>
                            <Table.HeaderCell >Transaction Hash</Table.HeaderCell>
                            <Table.HeaderCell >Price</Table.HeaderCell>
                            <Table.HeaderCell >Date and Time</Table.HeaderCell>
                            <Table.HeaderCell >Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <OrderRow orders={this.props.user.orders}/>
                </Table>
                </div>
            </DashboardLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default compose(
    connect(mapStateToProps)
)(OrderContracts);