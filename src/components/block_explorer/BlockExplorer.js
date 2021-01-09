import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import {Grid, Input, Dropdown, Table, Form} from "semantic-ui-react";
import "../../assets/scss/block_explorer.css"
import {RecentBlock} from "./RecentBlock";
import {RecentTransaction} from "./RecentTransaction";
import {ApolloClient,gql, InMemoryCache} from "@apollo/client";
import {Spinner2} from "../ui/Spinner";

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
});
class BlockExplorer extends Component {

    state={
        search:"",
        type:"All_Filters",
        blocks:null,
        transactions:null,
        loading:true,
        error:false,
        serverError:"",
    }
     options = [
         { key: 'All Filters', text: 'All Filters', value: 'All Filters' },
         { key: 'Addresses', text: 'Addresses', value: 'Addresses' },
         { key: 'Block', text: 'Block', value: 'Block' },
         { key: 'Transaction', text: 'Transaction', value: 'Transaction' },
]
    componentDidMount() {
        const that=this;
        client.query({query:gql`                
                query {
                    blocks{
                        id gasUsed number createdAt hash
                        receiptsRoot sha3Uncles
                        stateRoot transactionsRoot
                    }
                }
            `}).then(result=>{
            console.log(result.data.blocks)
            that.setState({blocks:result.data.blocks})
            client.query({query:gql`
                    query {
                        transactions {
                            transactionHash
                            from blockNumber
                            id to
                        }
                    }
                `}).then(result=>{
                console.log(result.data.transactions)
                that.setState({loading:false,transactions:result.data.transactions});
            }).catch(error=>{
                that.setState({loading:false,serverError:"Error! Try Again"})
                console.log(error.toString())
            })
        }).catch(error=>{
            that.setState({loading:false,serverError:"Error! Try Again"})
            console.log(error.toString())
        })

    }
    onKeyUp(event) {
        if (event.charCode === 13) {
            this.handleSearch();
        }
    }
    handleChnageType=(event,data)=>{
        if (data.value==="All Filters"){
            this.setState({error:false,type:"all_filters"})
        }else {
            this.setState({error:false,type:data.value})
        }

    }
    handleSearch(){
        const {search,type} =this.state
        if (search.length>0) {
            this.props.history.push(`/block_explorer/${type.toLowerCase()}:${search}`)
        }else {
            this.setState({error:true})
        }
    }
    handleChange=(event)=>{
        this.setState({error:false,search:event.target.value})
    }
    render() {
        const {loading,transactions,serverError,error,blocks}=this.state
        return (
            <Layout>
                <div className={"block-explorer-container"}>
                    <div className={'block_explorer'}>
                       <Form >
                           <Input
                               placeholder={"Search"}  size={'big'} fluid type={"text"}
                               label={
                                   <Dropdown
                                   defaultValue='All Filters' onChange={this.handleChnageType}
                                   options={this.options} />
                               }
                               action={{
                                   color: 'teal',
                                   labelPosition: 'right',
                                   icon: 'search',
                                   content: 'Search',
                                   onClick: () => this.handleSearch()
                                   }}
                               onChange={this.handleChange}
                               onKeyPress={(event)=>{this.onKeyUp(event)}}
                               labelPosition='left' error={error}
                           />
                       </Form>
                       {loading ? <Spinner2/> :
                           ( serverError==="" ?
                               <div className={"block-transaction"}>
                                   <div className={'recent_block'}>
                                       <h2>Recent BLock</h2>
                                       <Table className={"striped"}>
                                           <Table.Body>
                                               <RecentBlock blocks={blocks}/>
                                           </Table.Body>
                                       </Table>
                                   </div>
                                   <div className={"recent_transaction"} >
                                       <h2>Recent Transaction</h2>
                                       <Table className={"striped"}>
                                           <Table.Body>
                                               <RecentTransaction transactions={transactions}/>
                                           </Table.Body>
                                       </Table>
                                   </div>
                               </div>:"Error"
                           )
                       }
                    </div>
                </div>
            </Layout>
        );
    }
}

export default BlockExplorer;