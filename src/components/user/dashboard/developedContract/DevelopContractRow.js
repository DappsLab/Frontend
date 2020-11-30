import React, {Component} from 'react';
import {graphql} from "react-apollo";
import { getContract} from "../../../../queries/queries";
import {flowRight as compose} from "lodash";
import  {Loader,Table,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModel";



class DevelopContractRow extends Component{
    state={
        modalOpen:false,
    }
    closeModal=()=>{
        this.setState({modalOpen:false})
    }
    delateAction=()=>{
        this.closeModal();
        console.log("here")
    }
    handelDeveloped(){
        const data = this.props.data;
        console.log(this.props)
        if (data.loading){
            return <Table.Row >
                <Table.Cell className={"developed_body"}>
                    <Loader  size={"big"} content={"Loading"} active/>
                </Table.Cell>
            </Table.Row>
        } else {
            return data.smartContracts.map((contract,index)=>{
                return <Table.Row key={contract.id} >
                    <Table.Cell>{index+1}</Table.Cell>
                    <Table.Cell width={3}>{contract.contractName}</Table.Cell>
                    <Table.Cell width={2}>{contract.singleLicensePrice}</Table.Cell>
                    <Table.Cell width={2}>{contract.unlimitedLicensePrice}</Table.Cell>
                    <Table.Cell width={3}>{contract.publishingDateTime}</Table.Cell>
                    <Table.Cell width={1} negative={contract.verified!=="VERIFIED"&&true} positive={contract.verified==="VERIFIED"&&true}>{contract.verified}</Table.Cell>
                    <Table.Cell  width={1}>
                        <Link to={`/edit_samrt_contract/${contract.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>
                        <span onClick={()=>{this.setState({modalOpen:true})}}> <Icon circular link  inverted color='red' name='delete'/></span>
                    </Table.Cell>
                </Table.Row>
            })
        }
    }
    render() {
        return (
            <Table.Body>
                {this.handelDeveloped()}
                <DeleteModal
                    open={this.state.modalOpen}
                    close={this.closeModal}
                    deleteAction={this.delateAction}
                />
            </Table.Body>
        )
    }
}

export default compose(
    graphql(getContract, {
        options: (props) => {
            return {
                variables: {
                    id:props.id
                }
            }
        }
    })
)(DevelopContractRow);