import React from 'react';
import {Table} from "semantic-ui-react";
import {Link} from "react-router-dom";

export  const RecentTransaction = (props) => {
    const transactions=props.transactions;
    return transactions.map((transaction, index = 1) => {
        return <Table.Row key={transaction.id} className={"row"}>
            <Table.Cell>
                <div className={"block_address"}>
                    <div>Hash:</div><span><Link to={`/block_explorer/transaction:${transaction.transactionHash}`}>{transaction.transactionHash}</Link></span>
                </div>
                Block: <Link to={`/block_explorer/block:${transaction.blockNumber}`}>{transaction.blockNumber}</Link>
            </Table.Cell>
            <Table.Cell width={2} textAlign={"center"}>0 Dapps</Table.Cell>
            <Table.Cell >
                <div className={"block_address"}>
                    <div>From:</div><span><Link to={`/block_explorer/addresses:${transaction.from}`}>{transaction.from}</Link></span>
                </div>
                <div className={"block_address"}>
                    <div>To:</div><span><Link to={`/block_explorer/addresses:${transaction.to}`}>{transaction.to}</Link></span>
                </div>
            </Table.Cell>
        </Table.Row>
    })
};
