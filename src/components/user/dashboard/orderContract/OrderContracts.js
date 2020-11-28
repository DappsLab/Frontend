import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import OrderRow from "./OrderRow";

class OrderContracts extends Component {
    state={
        currentUser:this.props.user===null?this.props.currentUser:this.props.user
    }
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
                <Table className={"violet striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell  width={2}> Contract Name</Table.HeaderCell>
                            <Table.HeaderCell width={5}>Transaction Hash</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                            <Table.HeaderCell width={5}>Date and Time</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <OrderRow orders={currentUser.orders}/>
                </Table>
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