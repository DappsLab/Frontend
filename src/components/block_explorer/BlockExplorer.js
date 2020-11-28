import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import {Grid, Input,Dropdown, Table} from "semantic-ui-react";
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
                console.log(error)
            })
        }).catch(error=>{
            console.log(error)
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
        const {loading,transactions,error,blocks}=this.state
        return (
            <Layout>
               <Grid textAlign="center"  verticalAlign='middle' >
                   <Grid.Row className={"block_explorer"} style={{maxWidth:1200}}>
                       <Grid.Column>
                           <h1>TestNet <span>Block Explorer</span></h1>
                           <p>Discover blocks, transactions and all the information you want about blocks with the help of Blockchain Explorer.</p>
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
                       </Grid.Column>
                   </Grid.Row>
                   {loading ? <Spinner2/> :
                       <Grid.Row className={"recent_block"} style={{maxWidth: 1200}}>
                           <Grid.Column textAlign={"left"} width={5}>
                               <h2>Recent <span>BLock</span></h2>
                               <Table className={"striped"}>
                                   <Table.Body>
                                       <RecentBlock blocks={blocks}/>
                                   </Table.Body>
                               </Table>
                           </Grid.Column>
                           <Grid.Column className={"recent_transaction"} textAlign={"left"} width={11}>
                               <h2>Recent <span>Transaction</span></h2>
                               <Table className={"striped"}>
                                   <Table.Body>
                                       <RecentTransaction transactions={transactions}/>
                                   </Table.Body>
                               </Table>
                           </Grid.Column>
                       </Grid.Row>
                   }
               </Grid>
            </Layout>
        );
    }
}

export default BlockExplorer;