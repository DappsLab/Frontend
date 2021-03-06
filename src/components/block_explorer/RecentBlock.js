import React from 'react';
import { Table} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {dateTime} from "../ui/DateTimeConversion";

export const RecentBlock = (props) => {
   const blocks=props.blocks;
   return blocks.map(block => {
       return <Table.Row key={block.id}>
           <Table.Cell >Block No: <Link to={
               props.type==="main"? `/block_explorer/block:${block.number}`:
                   `/test_block_explorer/block:${block.number}`
           }>{block.number}</Link></Table.Cell>
           <Table.Cell >{block.gasUsed}</Table.Cell>
           <Table.Cell textAlign={"right"}>{dateTime(block.createdAt)}</Table.Cell>
       </Table.Row>
   })
}