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

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
const transactionBYAddress=gql`
     query ($address:String!) {
     transactionsByAddress(address: $address) {
        from id to blockHash blockNumber
        status transactionHash contractAddress
        gasPrice gasUsed createdAt
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
                                <TableCell>Block</TableCell>
                                <TableCell>to</TableCell>
                                <TableCell>Gas Used</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data!==null&& data.map(da => (
                                <TableRow key={da.id}>
                                    <TableCell>{da.blockNumber}</TableCell>
                                    <TableCell>{da.to}</TableCell>
                                    <TableCell>{da.gasUsed}</TableCell>
                                    <TableCell>{dateTime(da.createdAt)}</TableCell>
                                    <TableCell>{da.status ? "True" : "False"}</TableCell>
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
