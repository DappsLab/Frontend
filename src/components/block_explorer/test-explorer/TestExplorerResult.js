import React, {Component} from 'react';
import "../../../assets/scss/explorerResut.css"
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {AddressesResult, BlockResult, TransactionResult} from "../explorerSearch/DisplayResults";
import {Button, Grid, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Layout from "../../../hoc/Layout";
import {Spinner2} from "../../ui/Spinner";

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
const number=RegExp(/^[0-9]*$/);
class TestExplorerResult extends Component{
    state={
        data:null,
        search:"",
        loading:true,
        error:"",
        search1:"",
    }
    testBlockByNumber=(number)=>{
        console.log("here")
        const that=this;
        client.query({
            query: gql`
                query ($number:Int!) {
                    testBlockByNumber(blockNumber: $number) {
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
            if (result.data.testBlockByNumber){
                that.setState({loading:false,data:result.data.testBlockByNumber})
            }else {
                that.setState({loading:false,error:"Not Found"})
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
            console.log(error)
        })
    }
    testBlockById=(id)=>{
        const that=this;
        client.query({
            query: gql`
                query ($id:ID!) {
                    testBlockById(id: $id) {
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
            if (result.data.testBlockById){
                that.setState({loading:false,data:result.data.testBlockById})
            }else {
                if (that.state.search1==="transaction"){
                    that.setState({search: "transaction"})
                    this.testTransactionById(id);
                }else {
                    that.setState({loading: false, error: "Not Found"})
                }
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
            console.log(error)
        })

    }
    testBlockByHash=(hash)=>{
        const that=this;
        client.query({
            query: gql`
                query ($hash:String!) {
                    testBlockByHash(blockHash: $hash) {
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
            if (result.data.testBlockByHash){
                that.setState({loading:false,data:result.data.testBlockByHash})
            }else {
                if (that.state.search1==="transaction"){
                    that.setState({search:"transaction"})
                    that.testTransactionByHash(hash);
                }else {
                    that.setState({loading: false, error: "Not Found"})
                }
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
            console.log(error)
        })
    }
    testTransactionById=(id)=>{
        const that=this;
        client.query({
            query: gql`
                query ($id:ID!) {
                    testTransactionById(id: $id) {
                        blockHash blockNumber createdAt
                        cumulativeGasUsed from to
                        transactionHash contractAddress
                        gasPrice gasUsed id input nonce status
                        transactionIndex
                    }
                }
            `, variables: {id:id}
        }).then(result=>{
            if (result.data.testTransactionById){
                that.setState({loading:false,error:"",data:result.data.testTransactionById})
            }else {
                that.setState({loading:false,error:"Not Found"})
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
            console.log(error)
        })
    }
    testTransactionByHash=(hash)=>{
        const that=this;
        client.query({
            query: gql`
                query ($hash:String!) {
                    testTransactionByTransactionHash(transactionHash: $hash) {
                        blockHash blockNumber createdAt
                        cumulativeGasUsed from to
                        transactionHash contractAddress
                        gasPrice gasUsed id input nonce status
                        transactionIndex
                    }
                }
            `, variables: {hash:hash.toString()}
        }).then(result=>{
            if (result.data.testTransactionByTransactionHash){
                that.setState({loading:false,error:"",data:result.data.testTransactionByTransactionHash})
            }else {
                that.setState({loading:false,error:"Not Found"})
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"});
            console.log(error)
        })
    }
    testByAddresses=(address)=>{
        const that=this;
        client.query({
            query: gql`
                query ($address:String!) {
                    testTransactionsByAddress(address: $address) {
                        from id to blockHash blockNumber
                        status transactionHash contractAddress
                        gasPrice gasUsed createdAt
                    }
                }
            `, variables: {address:address.toString()}
        }).then(result=>{
            if (result.data.testTransactionsByAddress){
                that.setState({loading:false,data:result.data.testTransactionsByAddress})
            }else {
                that.setState({loading:false,error:"Not Found"})
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"});
            console.log(error)
        })
    }
    componentDidMount() {
        let search=this.props.match.params.search;
        search=search.split(":");
        this.setState({search:search[0]})
        if (search[0]==="block") {
            if (search[1].length===66){
                console.log("block hash")
                this.testBlockByHash(search[1])
            }else if (search[1].length===24){
                console.log("block id")
                this.testBlockById(search[1])
            } else  if (number.test(search[1])){
                console.log("block Number")
                this.testBlockByNumber(search[1]);
            }else {
                this.setState({loading:false,error:"Not Found"})
            }

        }else if (search[0]==="transaction"){
            if (search[1].length===66) {
                console.log("transaction hash")
                this.testTransactionByHash(search[1])
            }else if (search[1].length===24){
                console.log(" transaction id")
                this.testTransactionById(search[1])
            }else {
                this.setState({loading:false,error:"Not Found"})
            }
        } else if(search[0]==="addresses"){
            // if (search[0].length===42) {
            console.log("addresses1")
            this.testByAddresses(search[1])
            // }else {
            //     this.setState({loading:false,error:"Not Found"})
            // }
        } else if (search[0]==="all_filters"){
            if (number.test(search[1])) {
                this.setState({search:"block"})
                this.testBlockByNumber(search[1])
            }else if(search[1].length===42){
                this.setState({search:"addresses"})
                this.testByAddresses(search[1])
            }else if (search[1].length===24){
                this.setState({search:"block",search1:"transaction"})
                this.testBlockById(search[1])
            }else if (search[1].length===66){
                this.setState({search:"block",search1:"transaction"})
                this.testBlockByHash(search[1])
            }
            else{
                this.setState({loading:false,error:"Not Found"})
                console.log(search[0])
            }
        }
    }
    handleReturn(){
        const {loading,data,error,search}=this.state;
        if (!loading) {
            console.log(search,data,error)
            if (error===""&&data!==null) {
                if (search === "block") {
                    return <BlockResult data={data}/>
                }  if (search === "transaction") {
                    return <TransactionResult data={data}/>
                }if (search==="addresses"){
                    return <AddressesResult address={this.props.match.params.search} data={data}/>
                }
            } else {
                console.log("here")
                return <Grid textAlign={'center'}>
                    <Grid.Row>
                        <p style={{color:'#fff'}}>{error}</p>
                    </Grid.Row>
                    <Grid.Row>
                        <Button onClick={()=>{this.props.history.push("/block_explorer")}}><Link  to={"/block_explorer"}>Goto Block Explorer</Link></Button>
                    </Grid.Row>
                </Grid>
            }
        }
    }
    render() {
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' className={"result_container"}>
                    <Grid.Column style={{maxWidth:this.state.search==="addresses"?1400:1000}}>
                        {this.state.loading?<Spinner2/>:
                            <Segment>
                                {this.handleReturn()}
                            </Segment>
                        }

                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default TestExplorerResult;
