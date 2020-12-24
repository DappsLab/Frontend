import React, {Component} from 'react';
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
const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});

class Transactions extends Component {
    state={
        loading:true,
        data:null,
    }
   componentDidMount() {
        const address=this.props.currentUser.address;
    const that=this;
            client.query({
                query: gql`
                    query ($address:String!) {
                        transactionsByAddress(address: $address) {
                            from id to blockHash blockNumber
                            status transactionHash contractAddress
                            gasPrice gasUsed createdAt
                        }
                    }
                `, variables: {address:address.toString()}
            }).then(result=>{
                if (result.data.transactionsByAddress){
                    that.setState({loading:false,data:result.data.transactionsByAddress})
                }else {
                    that.setState({loading:false,error:"Not Found"})
                }
            }).catch(error=>{
                that.setState({loading:false,error:"Not Found"});
                console.log(error)
            })
    }
    renderTransaction(){
        const {data}=this.state;
        console.log("transaction",data)
        if (data){
            return data.slice(0,10).map(da=> {
                return <TableRow key={da.id}>
                    <TableCell>{da.blockNumber}</TableCell>
                    <TableCell>{da.to}</TableCell>
                    <TableCell>{da.gasUsed}</TableCell>
                    <TableCell> {dateTime(da.createdAt)}</TableCell>
                    <TableCell>{da.status?"True":"False"}</TableCell>
                </TableRow>
            })
        }else {
            return <div className={"transaction_result "}>No Transaction</div>
        }
    }
    render() {
        console.log(this.props.currentUser);
        const {loading}=this.state
        return (
            <AccountLayout {...this.props}>
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
                            {!loading&&this.renderTransaction()}
                        </TableBody>
                    </Table>
                    {loading&&<Spinner2/>}
                </Paper>
            </div>
            </AccountLayout>
        );
    }
}

export default Transactions;
