import React, {Component} from 'react';
import {Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

class RecentTransaction extends Component {
    render() {
        return (
            <Table.Row className={"row"}>
                <Table.Cell className={"block_address"}>
                    <span><Link to={"/"}>0x6fc60x6fc6811fdb48e28ac89f4a50bf4115ffb991b811fdb48e28ac89f4a50bf4115ffb991b</Link></span>
                   <br/> Block: <Link to={"/"}>2912</Link>
                </Table.Cell>
                <Table.Cell width={2} textAlign={"center"} >0 Dapps</Table.Cell>
                <Table.Cell >
                    From:<Link to={"/"}> 0xf6df3CdC4Abc93AF4E36098db4B8D73a4980c2CF</Link><br/>
                    To:<Link to={"/"}>0xf6df3CdC4Abc93AF4E36098db4B8D73a4980c2CF</Link>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default RecentTransaction;