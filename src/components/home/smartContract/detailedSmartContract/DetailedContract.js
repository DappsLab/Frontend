import React from 'react';
import  '../../../../assets/scss/detailed_contract.css';
import {Button, Divider, Icon} from 'semantic-ui-react'
import Layout from "../../../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import {orderContract, contractById, me_Query, dappsbyid} from "../../../../queries/queries";
import {ContractImg} from "../../../ui/Icons";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "../../../../assets/scss/licenses.css"
import {getDate} from "../../../ui/Helpers";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import Licenses from "./Licenses";
import {useQuery} from "@apollo/client";
import ContractBuyDetails from "./ContractBuyDetails";


const  DetailedContract =(props)=>{
    const color=[
        {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
    ]
    const RenderData=()=> {
        const {loading, error, data} = useQuery(contractById, {
            client: Client,
            variables: {id: props.match.params.id},
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const contract=data.smartContractById;
            return    <div className={"contractContainer flex"}>
            <div className={"contractLeft"}>
                <ContractImg
                    position={"unset"}
                    imagePath={contract.image}
                    height={"90px"} width={"90px"}
                />
                <h2>{contract.contractName}</h2>
                <span>{getDate(contract.publishingDateTime)}</span>
                <div>
                    <Button size={"mini"} color='facebook'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                    <Button size={"mini"} color='twitter'>
                        <Icon name='twitter' /> Twitter
                    </Button>
                    <Button size={"mini"} color='linkedin'>
                        <Icon name='linkedin' /> LinkedIn
                    </Button>
                    <div className={"contract_category"}>
                        {contract.contractCategory.map((category, index) => {
                            return <Link  key={category}  to={`/search_result/${category}`} >
                                <Button
                                    size={"mini"}
                                    color={color["0"][index]} >
                                    {category}</Button>
                            </Link>
                        })
                        }
                    </div>
                    <Divider/>
                    <label><strong>Description</strong></label>
                    <p>{contract.description}</p>
                    <Avatar  src={contract.publisher.avatar}/>
                    <h3>{contract.publisher.fullName}</h3>
                </div>
                <Licenses contract={contract} logged_session={props.logged_session}  {...props} user={props.currentUser}/>
            </div>
                <ContractBuyDetails contract={contract} logged_session={props.logged_session}  {...props} user={props.currentUser}/>
            </div>
        }
    }
    return (
        <Layout>
            {RenderData()}
        </Layout>
    );
}
const mapStateToProps=(state)=>({
    logged_session:state.user.logged_session,
    currentUser:state.user.currentUser
});
export default compose(connect(mapStateToProps)) (DetailedContract)
