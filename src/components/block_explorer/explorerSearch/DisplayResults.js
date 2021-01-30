import React from 'react';
import {List, Divider, Button, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {dateTime} from "../../ui/DateTimeConversion";

export const BlockResult=({data,history,type})=>{
    console.log("type:",type)
    const transaction=data.transactions
    const list=[
        {name:"Block ID:",value:data.id},
        {name:"Block Size:",value:data.size},
        {name:"Hash:",value:<Link to={'#'}>{data.hash}</Link>},
        {name:"Number of Transaction:",value:<span><Link to={'#'}>{transaction.length} transactios</Link> in this block</span>},
        {name:"Created At:",value:dateTime(data.createdAt)},
        {name:"Gas Limit:",value:data.gasLimit},
        {name:"Gas Used:",value:data.gasUsed},
        {name:"Extra Data:",value:data.extraData},
        {name:"Dificulty:",value:data.difficulty},
        {name:"Total Dificulty:",value:data.totalDifficulty},
        {name:"Stae Root:",value:data.stateRoot},
        {name:"Sha3Uncles:",value:data.sha3Uncles},
        {name:"Parent Hash:",value:data.parentHash},
        {name:"Nonce:",value:data.nonce},
    ]
    return <div key={data.id} className={"block_result"}>
        <h4>Block #{data.number}</h4>
        <Divider/>
        <List divided verticalAlign='middle'>
            {list.map(li=>{
              return  <List.Item key={li.name} className={"flex"}>
                    <List.Content>{li.name}</List.Content>
                  <List.Content>{li.value}</List.Content>
                </List.Item>
            })}
        </List>
    </div>
}
export const TransactionResult=({data,history,type})=>{
    console.log("type:",type)
    const list=[
        {name:"Transaction ID:",value:data.id},
        {name:"Transaction Hash:",value:<Link to={
                type==='main'?`/block_explorer/transaction:${data.transactionHash}`:
                    `/test_block_explorer/transaction:${data.transactionHash}`
            }>{data.transactionHash}</Link>},
        {name:"From",value:<Link to={
                type==='main'?`/block_explorer/addresses:${data.from}`:
                    `/test_block_explorer/addresses:${data.from}`
            }>{data.from}</Link>},
        {name:"To:",value:<Link to={
                type==='main'?`/block_explorer/addresses:${data.to}`:
                    `/test_block_explorer/addresses:${data.to}`
            }>{data.to}</Link>},
        {name:"Block Hash",value:<Link to={
                type==='main'?`/block_explorer/block:${data.blockHash}`:
                    `/test_block_explorer/block:${data.blockHash}`
            }>{data.blockHash}</Link>},
        {name:"Block Number:",value:data.blockNumber},
        {name:"Created At:",value:dateTime(data.createdAt)},
        {name:"Gas Price:",value:data.gasPrice},
        {name:"Gas Used:",value:data.gasUsed},
        {name:"Input:",value:data.input},
        {name:"Status:",value:data.status?<Button color={'green'} disabled>Varified</Button>:<Button color={'red'} disabled>Not Verified</Button>},
        {name:"Transaction Index:",value:data.transactionIndex},
        {name:"Cumulative Gas Used:",value:data.cumulativeGasUsed},
        {name:"Nonce:",value:data.nonce},
    ]
    return <div key={data.id} className={"block_result"}>
        <h4>Transaction Details</h4>
        <Divider/>
        <List divided verticalAlign='middle'>
            {list.map(li=>{
                return  <List.Item key={li.name} className={"flex"}>
                    <List.Content>{li.name}</List.Content>
                    <List.Content>{li.value}</List.Content>
                </List.Item>
            })}
        </List>
    </div>
}
export const AddressesResult=({data,type,history,address})=>{
    address=address.split(":");
    return <div className={"address"}>
        <h4>Address: {address[1]}</h4>
        <Table  className={"striped"}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell >Transaction Hash </Table.HeaderCell>
                    <Table.HeaderCell > Block No.</Table.HeaderCell>
                    <Table.HeaderCell >Created At</Table.HeaderCell>
                    <Table.HeaderCell >To</Table.HeaderCell>
                    <Table.HeaderCell >From</Table.HeaderCell>
                    <Table.HeaderCell >Gas Used</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(da=>{
                    return <Table.Row key={da.id}>
                        <Table.Cell><span className={"block_address"}><Link to={
                            type==='main'?`/block_explorer/transaction:${da.transactionHash}`:
                                `/test_block_explorer/transaction:${da.transactionHash}`
                        }>{da.transactionHash}</Link></span></Table.Cell>
                        <Table.Cell>{da.blockNumber}</Table.Cell>
                        <Table.Cell>{dateTime(da.createdAt)}</Table.Cell>
                        <Table.Cell><span className={"block_address"}><Link to={
                            type==='main'?`/block_explorer/addresses:${da.to}`:
                                `/test_block_explorer/addresses:${da.to}`
                        }>{da.to}</Link></span></Table.Cell>
                        <Table.Cell><span className={"block_address"}><Link to={
                            type==='main'?`/block_explorer/addresses:${da.from}`:
                                `/test_block_explorer/addresses:${da.from}`
                        }>{da.from}</Link></span></Table.Cell>
                        <Table.Cell>{da.gasUsed}</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    </div>
}