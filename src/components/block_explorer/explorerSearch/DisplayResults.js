import React from 'react';
import {List, Divider, Button, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {dateTime} from "../../ui/DateTimeConversion";

export const BlockResult=(props)=>{
    const data=props.data;
    console.log(data)
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
export const TransactionResult=(props)=>{
    const d=props.data;
    console.log(d)
    const list=[
        {name:"Transaction ID:",value:d.id},
        {name:"Transaction Hash:",value:<Link to={'#'}>{d.transactionHash}</Link>},
        {name:"From",value:<Link to={'#'}>{d.from}</Link>},
        {name:"To:",value:<Link to={'#'}>{d.to}</Link>},
        {name:"Block Hash",value:<Link to={'#'}>{d.blockHash}</Link>},
        {name:"Block Number:",value:d.blockNumber},
        {name:"Created At:",value:dateTime(d.createdAt)},
        {name:"Gas Price:",value:d.gasPrice},
        {name:"Gas Used:",value:d.gasUsed},
        {name:"Input:",value:d.input},
        {name:"Status:",value:d.status?<Button color={'green'} disabled>Varified</Button>:<Button color={'red'} disabled>Not Verified</Button>},
        {name:"Transaction Index:",value:d.transactionIndex},
        {name:"Cumulative Gas Used:",value:d.cumulativeGasUsed},
        {name:"Nonce:",value:d.nonce},
    ]
    return <div key={d.id} className={"block_result"}>
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
export const AddressesResult=(props)=>{
    const data=props.data;
    let search=props.address;
    search=search.split(":");
    return <div className={"address"}>
        <h4>Address: {search[1]}</h4>
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
                        <Table.Cell><span className={"block_address"}><Link to={'#'}>{da.transactionHash}</Link></span></Table.Cell>
                        <Table.Cell>{da.blockNumber}</Table.Cell>
                        <Table.Cell>{dateTime(da.createdAt)}</Table.Cell>
                        <Table.Cell><span className={"block_address"}><Link to={'#'}>{da.to}</Link></span></Table.Cell>
                        <Table.Cell><span className={"block_address"}><Link to={"#"}>{da.from}</Link></span></Table.Cell>
                        <Table.Cell>{da.gasUsed}</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    </div>
}