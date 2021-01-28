import React, { useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {ApolloClient,gql, InMemoryCache} from "@apollo/client";
import {Spinner2} from "../../ui/Spinner";
import {dateTime} from "../../../helpers/DateTimeConversion";
import AccountLayout from "../../../hoc/AccountLayout";
import {Query} from "react-apollo";
import {toEth} from "../../ui/ContractInteractionHelper";
import {Link} from "react-router-dom";

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
const transactionBYAddress=gql`
     query ($address:String!) {
     transactionsByAddress(address: $address) {
        from id to blockHash blockNumber
        status transactionHash contractAddress
        gasPrice gasUsed createdAt value
        }
     }`
const Transactions =(props)=> {
    const [data,setData]=useState(null)

    return (
        <AccountLayout {...props}>
            <div className={"transaction"}>
                <h2>Transaction</h2>
                <Paper   className={"fullWidth"}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Block Hash</TableCell>
                                <TableCell>to</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data!==null&& data.map(da => (
                                <TableRow key={da.id}>
                                    <TableCell><Link to={`/block_explorer/transaction:${da.transactionHash}`}>{da.blockHash}</Link></TableCell>
                                    <TableCell><Link to={`/block_explorer/addresses:${da.to}`}>{da.to}</Link></TableCell>
                                    <TableCell>{dateTime(da.createdAt)}</TableCell>
                                    <TableCell>{toEth(da.value)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Query query={transactionBYAddress} client={client}
                           fetchPolicy={'network-only'} variables={{
                               address: props.user.address
                           }} onCompleted={
                        data => {
                            if (data.transactionsByAddress.length) {
                                setData(data.transactionsByAddress)
                            }
                        }
                    }>
                        {({loading,data,error})=>{
                            if (loading) return <Spinner2/>
                            if (error) return <p>{error.toString()} </p>
                            if (data){
                                if (!data.transactionsByAddress.length){
                                    return <div>No Transaction</div>
                                }
                                return <div> </div>
                            }
                        }}
                    </Query>
                </Paper>
            </div>
        </AccountLayout>
    );
}


export default  (Transactions);
