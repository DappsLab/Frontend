import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import { Input, Dropdown, Table, Form} from "semantic-ui-react";
import "../../assets/scss/block_explorer.css"
import {RecentBlock} from "./RecentBlock";
import {RecentTransaction} from "./RecentTransaction";
import {ApolloClient,gql, InMemoryCache} from "@apollo/client";
import {Spinner2} from "../ui/Spinner";
import {BCDB_PORT, SERVER_URL} from "../../constants";

const client = new ApolloClient({
    uri: `${SERVER_URL}${BCDB_PORT}/graphql`,
    cache: new InMemoryCache(),
});
class BlockExplorer extends Component {

    state={
        search:"",
        explorerType:'main',
        type:"All_Filters",
        blocks:null,
        transactions:null,
        loading:true,
        error:false,
        serverError:"",
        testBlocks:null,
        testTransactions:null,
        testLoading:true,
        testServerError:"",
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
                that.setState({loading:false,transactions:result.data.transactions});
            }).catch(error=>{
                that.setState({loading:false,serverError:"Error! Try Again"})
                console.log(error.toString())
            })
        }).catch(error=>{
            that.setState({loading:false,serverError:"Error! Try Again"})
            console.log(error.toString())
        })
        client.query({query:gql`                
                query {
                    testBlocks{
                        id gasUsed number createdAt hash
                        receiptsRoot sha3Uncles
                        stateRoot transactionsRoot
                    }
                }
            `}).then(result=>{
            that.setState({testBlocks:result.data.testBlocks})
            client.query({query:gql`
                    query {
                        testTransactions {
                            transactionHash
                            from blockNumber
                            id to
                        }
                    }
                `}).then(result=>{
                that.setState({testLoading:false,testTransactions:result.data.testTransactions});
            }).catch(error=>{
                that.setState({testLoading:false,testServerError:"Error! Try Again"})
                console.log(error.toString())
            })
        }).catch(error=>{
            that.setState({testLoading:false,testServerError:"Error! Try Again"})
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
        const {explorerType,search,type} =this.state
        if (search.length>0) {
            if (explorerType==="main") {
                this.props.history.push(`/block_explorer/${type.toLowerCase()}:${search}`)
            }else {
                this.props.history.push(`/test_block_explorer/${type.toLowerCase()}:${search}`)
            }
        }else {
            this.setState({error:true})
        }
    }
    handleChange=(event)=>{
        this.setState({error:false,search:event.target.value})
    }
    handleTab=(tab)=>{
        this.setState({explorerType:tab})
    }
    render() {
        const {loading,testBlocks,testTransactions,explorerType,transactions,serverError,error,blocks}=this.state
        return (
            <Layout>
                <div className={"block-explorer-container"}>
                    <div className={`block_explorer ${explorerType==='main'?'main-active':'test-active'}`}>
                        <div className={'btn-container'}>
                            <button onClick={()=>this.handleTab('main')} className={`explorer-main`}>Main Explorer</button>
                            <button onClick={()=>this.handleTab('test')} className={`explorer-test`}>Test Explorer</button>
                        </div>
                        <hr className={`${explorerType==='main'?'main':'test'}`}/>
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
                                               <RecentBlock type={explorerType} blocks={explorerType==="main"? blocks:testBlocks}/>
                                           </Table.Body>
                                       </Table>
                                   </div>
                                   <div className={"recent_transaction"} >
                                       <h2>Recent Transaction</h2>
                                       <Table className={"striped"}>
                                           <Table.Body>
                                               <RecentTransaction type={explorerType} transactions={explorerType==="main"?transactions:testTransactions}/>
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