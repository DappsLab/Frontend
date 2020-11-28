import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import {Grid, Segment} from "semantic-ui-react"
import "../../../assets/scss/explorerResut.css"
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {BlockResult, TransactionResult} from "./DisplayResults";
const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
class ExplorerResult extends Component {
    state={
        data:null,
        search:"",
        loading:true,
    }
    blockByNumber=(number)=>{
        const that=this;
        client.query({
            query: gql`
                query ($number:Int!) {
                    blockByNumber(blockNumber: $number) {
                        hash createdAt size id
                        transactions {
                            id
                        }
                         extraData gasLimit
                        gasUsed difficulty
                        number totalDifficulty
                        parentHash sha3Uncles
                        stateRoot nonce logsBloom
                        }
                    }
                `, variables: {number:parseInt(number)}
            }).then(result=>{
            that.setState({loading:false,data:result.data.blockByNumber})
        }).catch(error=>{
            console.log(error)
        })
    }
    blockById=(id)=>{
        const that=this;
        client.query({
            query: gql`
                query ($id:ID!) {
                    blockById(id: $id) {
                        hash createdAt size id
                        transactions {
                            id
                        }
                        extraData gasLimit
                        gasUsed difficulty
                        number totalDifficulty
                        parentHash sha3Uncles
                        stateRoot nonce logsBloom
                    }
                }
            `, variables: {id:id}
        }).then(result=>{
            that.setState({loading:false,data:result.data.blockById})
        }).catch(error=>{
            console.log(error)
        })
    }
    blockByHash=(hash)=>{
        const that=this;
        client.query({
            query: gql`
                query ($hash:String!) {
                    blockByHash(blockHash: $hash) {
                        hash createdAt size id
                        transactions {
                            id
                        }
                        extraData gasLimit
                        gasUsed difficulty
                        number totalDifficulty
                        parentHash sha3Uncles
                        stateRoot nonce logsBloom
                    }
                }
            `, variables: {hash:hash.toString()}
        }).then(result=>{
            that.setState({loading:false,data:result.data.blockByHash})
        }).catch(error=>{
            console.log(error)
        })
    }
    transactionById=(id)=>{
        const that=this;
        client.query({
            query: gql`
                query ($id:ID!) {
                    transactionById(id: $id) {
                        blockHash blockNumber createdAt
                        cumulativeGasUsed from to
                        transactionHash contractAddress
                        gasPrice gasUsed id input nonce status
                        transactionIndex
                    }
                }
            `, variables: {id:id}
        }).then(result=>{
            that.setState({loading:false,data:result.data.transactionById})
        }).catch(error=>{
            console.log(error)
        })
    }
    transactionByHash=(hash)=>{
        const that=this;
        client.query({
            query: gql`
                query ($hash:String!) {
                    transactionByTransactionHash(transactionHash: $hash) {
                        blockHash blockNumber createdAt
                        cumulativeGasUsed from to
                        transactionHash contractAddress
                        gasPrice gasUsed id input nonce status
                        transactionIndex
                    }
                }
            `, variables: {hash:hash.toString()}
        }).then(result=>{
            that.setState({loading:false,data:result.data.transactionByTransactionHash})
        }).catch(error=>{
            console.log(error)
        })
    }
    componentDidMount() {
        let search=this.props.match.params.search;
        search=search.split(":");
        this.setState({search:search[0]})
        if (search[0]==="block") {
            if (search[1].length===66){
                this.blockByHash(search[1])
            }else if (search[1].length===24){
                this.blockById(search[1])
            } else {
                this.blockByNumber(search[1]);
            }

        }else if (search[0]==="transaction"){
            if (search[1].length===66) {
                this.transactionByHash(search[1])
            }else if (search[1].length===24){
                this.transactionById(search[1])
            }
        }else if (""){

        }
    }
    handleReturn(){
        const {loading,data,search}=this.state;
        if (!loading) {
            console.log(search,data)
            if (search === "block") {
                return <BlockResult data={data}/>
            } else if(search==="transaction"){
                return <TransactionResult data={data}/>
            }
            else {
                return "Not Found"
            }
        }
    }
    render() {
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' className={"result_container"}>
                    <Grid.Column style={{maxWidth:1000}}>
                        <Segment>
                            {this.handleReturn()}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default ExplorerResult;