import React, {Component} from 'react';
import DashboardLayout from "../../../hoc/DashboardLayout";
import {Table} from "semantic-ui-react";


class TestContract extends Component {
    render() {
        return (
            <DashboardLayout>
                <Table className={"violet striped "} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>No </Table.HeaderCell>
                            <Table.HeaderCell  width={7}> Contract Name</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Price</Table.HeaderCell>
                            <Table.HeaderCell width={5}>Usage</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>Apples</Table.Cell>
                            <Table.Cell>Free</Table.Cell>
                            <Table.Cell>Usages</Table.Cell>
                            {/*<Icon circular link className={"flex"} inverted color='teal' name='chevron down'/>*/}
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>Apples</Table.Cell>
                            <Table.Cell>Free</Table.Cell>
                            <Table.Cell>Usages</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </DashboardLayout>
        );
    }
}

export default TestContract;