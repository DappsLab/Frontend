import React, {Component} from 'react';
import DashboardLayout from "../../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import DevelopContractRow from "./DevelopContractRow";

class DevelopedContracts extends Component {
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
        console.log(this.props)
        const {currentUser}=this.state;
        return (
            <DashboardLayout>
                <Table className={"violet developed striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell  > Contract Name</Table.HeaderCell>
                            <Table.HeaderCell >Single Price</Table.HeaderCell>
                            <Table.HeaderCell >Unlimited Price</Table.HeaderCell>
                            <Table.HeaderCell >Created Date</Table.HeaderCell>
                            <Table.HeaderCell >Status</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <DevelopContractRow id={currentUser.id}/>
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
)(DevelopedContracts);