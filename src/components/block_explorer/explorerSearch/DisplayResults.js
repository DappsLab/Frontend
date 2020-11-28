import React from 'react';
import {List, Divider, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {dateTime} from "../../../helpers/DateTimeConversion";

export const BlockResult=(props)=>{
    const data=props.data;
    console.log(data)
    return data.map(d=>{
        const transaction=d.transactions
        const list=[
            {name:"Block ID:",value:d.id},
            {name:"Block Size:",value:d.size},
            {name:"Hash:",value:<Link to={'#'}>{d.hash}</Link>},
            {name:"Number of Transaction:",value:<span><Link to={'#'}>{transaction.length} transactios</Link> in this block</span>},
            {name:"Created At:",value:dateTime(d.createdAt)},
            {name:"Gas Limit:",value:d.gasLimit},
            {name:"Gas Used:",value:d.gasUsed},
            {name:"Extra Data:",value:d.extraData},
            {name:"Dificulty:",value:d.difficulty},
            {name:"Total Dificulty:",value:d.totalDifficulty},
            {name:"Stae Root:",value:d.stateRoot},
            {name:"Sha3Uncles:",value:d.sha3Uncles},
            {name:"Parent Hash:",value:d.parentHash},
            {name:"Nonce:",value:d.nonce},
        ]
        return <div key={d.id} className={"block_result"}>
            <h4>Block #{d.number}</h4>
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
    })
}
export const TransactionResult=(props)=>{
    const data=props.data;
    console.log(data)
    return data.map(d=>{
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
    })
}