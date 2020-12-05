import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import { Table} from 'semantic-ui-react'
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import PurchasedRow from "./PurchasedRow";
import Admin from "../../../admin/Admin";


class Purchased extends Component {
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
                    <Admin {...this.props} currentUser={currentUser}/>
                }
            </DashboardLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default compose(
    connect(mapStateToProps)
)(Purchased);