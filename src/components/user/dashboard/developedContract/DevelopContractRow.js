import React, {Component} from 'react';
import {graphql} from "react-apollo";
import {contractById, getContract} from "../../../../queries/queries";
import {flowRight as compose} from "lodash";
import  {Loader,Table,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteModal from "./DeleteModel";
import {dateTime} from "../../../../helpers/DateTimeConversion";



class DevelopContractRow extends Component{
    state={
        modalOpen:false,
    }
    closeModal=()=>{
        this.setState({modalOpen:false})
    }
    delateAction=()=>{
        this.closeModal();
    }
    handelDeveloped(){
        const smartContracts = this.props.smartContracts;
        return smartContracts.map((contract,index)=>{
            return <Table.Row key={contract.id} >
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell width={3}>{contract.contractName}</Table.Cell>
                <Table.Cell width={2}>{contract.singleLicensePrice}</Table.Cell>
                <Table.Cell width={2}>{contract.unlimitedLicensePrice}</Table.Cell>
                <Table.Cell width={3}>{dateTime( contract.publishingDateTime)}</Table.Cell>
                <Table.Cell width={1} negative={contract.verified!=="VERIFIED"&&true} positive={contract.verified==="VERIFIED"&&true}>{contract.verified}</Table.Cell>
                <Table.Cell  width={1}>
                    <Link to={`/edit_samrt_contract/${contract.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>
                    <span onClick={()=>{this.setState({modalOpen:true})}}> <Icon circular link  inverted color='red' name='delete'/></span>
                </Table.Cell>
            </Table.Row>
        })
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

export default (DevelopContractRow);