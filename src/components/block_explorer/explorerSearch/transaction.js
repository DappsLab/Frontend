import React from 'react';
import {Grid, Segment} from "semantic-ui-react";
import Layout from "../../../hoc/Layout";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {Query} from 'react-apollo'
import {Spinner3} from "../../ui/Spinner";
import {TransactionResult} from "./DisplayResults";

const transactionHash=gql`
     query ($hash:String!) {
       transactionByTransactionHash(transactionHash: $hash) {
        blockHash blockNumber createdAt
        cumulativeGasUsed from to
        transactionHash contractAddress
        gasPrice gasUsed id input nonce status
        transactionIndex
    }
}`
const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});

const ExplorerTransactions = (props) => {
    const handleReturn=()=>{
        const search=props.match.params.search;
        return <Query variables={{hash:search}} client={client} query={transactionHash}>
            {({loading,data,error})=>{
                if (loading) return <Spinner3/>
                if (error) return <p>{error.toString()}</p>
                if (data){
                    return <TransactionResult type={'main'} {...props} data={data.transactionByTransactionHash}/>
                }
            }}
        </Query>
    }
    return (
        <Layout>
            <Grid textAlign="center"  verticalAlign='middle' className={"result_container"}>
                <Grid.Column style={{alignSelf:'flex-start!important',maxWidth:1000}}>
                    <Segment>
                        <div>dsdf</div>
                        {handleReturn()}
                    </Segment>
                </Grid.Column>
            </Grid>
        </Layout>
    );
};

export default ExplorerTransactions;
