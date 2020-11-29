import React, {Component} from 'react';
import Layout from "../../../hoc/Layout";
import {Grid, Segment} from "semantic-ui-react"
import "../../../assets/scss/explorerResut.css"
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {AddressesResult, BlockResult, TransactionResult} from "./DisplayResults";
import {Spinner2} from "../../ui/Spinner";
const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
const number=RegExp(/^[0-9]*$/);
class ExplorerResult extends Component {
    state={
        data:null,
        search:"",
        loading:true,
        error:"",
        search1:"",
    }
    blockByNumber=(number)=>{
        console.log("here")
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
                if (result.data.blockByNumber){
                    that.setState({loading:false,data:result.data.blockByNumber})
                }else {
                    that.setState({loading:false,error:"Not Found"})
                }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
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
            if (result.data.blockById){
                 that.setState({loading:false,data:result.data.blockById})
            }else {
                if (that.state.search1==="transaction"){
                    that.setState({search: "transaction"})
                    this.transactionById(id);
                 }else {
                    that.setState({loading: false, error: "Not Found"})
                }
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
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
            if (result.data.blockByHash){
                 that.setState({loading:false,data:result.data.blockByHash})
            }else {
                if (that.state.search1==="transaction"){
                    that.setState({search:"transaction"})
                    that.transactionByHash(hash);
                }else {
                    that.setState({loading: false, error: "Not Found"})
                }
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
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
            if (result.data.transactionById){
            that.setState({loading:false,error:"",data:result.data.transactionById})
        }else {
            that.setState({loading:false,error:"Not Found"})
        }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"})
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
            if (result.data.transactionByTransactionHash){
                 that.setState({loading:false,error:"",data:result.data.transactionByTransactionHash})
            }else {
                that.setState({loading:false,error:"Not Found"})
            }
        }).catch(error=>{
            that.setState({loading:false,error:"Not Found"});
            console.log(error)
        })
    }
    byAddresses=(address)=>{
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
    componentDidMount() {
        let search=this.props.match.params.search;
        search=search.split(":");
        this.setState({search:search[0]})
        if (search[0]==="block") {
            if (search[1].length===66){
                console.log("block hash")
                this.blockByHash(search[1])
            }else if (search[1].length===24){
                console.log("block id")
                this.blockById(search[1])
            } else  if (number.test(search[1])){
                console.log("block Number")
                this.blockByNumber(search[1]);
            }else {
                this.setState({loading:false,error:"Not Found"})
            }

        }else if (search[0]==="transaction"){
            if (search[1].length===66) {
                console.log("transaction hash")
                this.transactionByHash(search[1])
            }else if (search[1].length===24){
                console.log(" transaction id")
                this.transactionById(search[1])
            }else {
                this.setState({loading:false,error:"Not Found"})
            }
        } else if(search[0]==="addresses"){
            // if (search[0].length===42) {
                console.log("addresses1")
                this.byAddresses(search[1])
            // }else {
            //     this.setState({loading:false,error:"Not Found"})
            // }
        } else if (search[0]==="all_filters"){
            if (number.test(search[1])) {
                this.setState({search:"block"})
                this.blockByNumber(search[1])
            }else if(search[1].length===42){
                this.setState({search:"addresses"})
                this.byAddresses(search[1])
            }else if (search[1].length===24){
                this.setState({search:"block",search1:"transaction"})
                this.blockById(search[1])
            }else if (search[1].length===66){
                this.setState({search:"block",search1:"transaction"})
                this.blockByHash(search[1])
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
                return <div>{error}</div>
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

export default ExplorerResult;