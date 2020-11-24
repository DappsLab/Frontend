import React, {Component} from 'react';
import { Table} from "semantic-ui-react";

class RecentBlock extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell width={1}>13434</Table.Cell>
                <Table.Cell width={1}>1tx</Table.Cell>
                <Table.Cell textAlign={"right"}>Wed, Oct 21, 2020, 5:07:18 AM</Table.Cell>
            </Table.Row>
        );
    }
}

export default RecentBlock;