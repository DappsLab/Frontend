import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import { Grid, Table} from "semantic-ui-react";
import "../../assets/scss/block_explorer.css"
import RecentBlock from "./RecentBlock";
import RecentTransaction from "./RecentTransaction";

class BlockExplorer extends Component {
    render() {
        return (
            <Layout>
               <Grid textAlign="center"  verticalAlign='middle' >
                   <Grid.Row className={"block_explorer"} style={{maxWidth:1200}}>
                       <Grid.Column >
                           <h1>TestNet <span>Block Explorer</span></h1>
                           <p>Discover blocks, transactions and all the information you want about blocks with the help of Blockchain Explorer.</p>
                       </Grid.Column>
                   </Grid.Row>
                   <Grid.Row className={"recent_block"}  style={{maxWidth:1200}}>
                       <Grid.Column textAlign={"left"} width={5}>
                           <h2>Recent <span>BLock</span></h2>
                           <Table className={"striped"} >
                               <RecentBlock/>
                               <RecentBlock/>
                               <RecentBlock/>
                               <RecentBlock/>
                               <RecentBlock/>
                               <RecentBlock/>
                               <RecentBlock/>
                           </Table>
                       </Grid.Column>
                       <Grid.Column textAlign={"left"} width={11}>
                           <h2>Recent <span>Transaction</span></h2>
                           <Table className={"striped"} >
                              <RecentTransaction/>
                              <RecentTransaction/>
                              <RecentTransaction/>
                               <RecentTransaction/>
                               <RecentTransaction/>
                               <RecentTransaction/>
                               <RecentTransaction/>
                           </Table>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
            </Layout>
        );
    }
}

export default BlockExplorer;