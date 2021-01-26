import React from 'react';
import  '../../../../assets/scss/detailed_contract.css';
import {Button, Divider, Icon} from 'semantic-ui-react'
import Layout from "../../../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import { contractById} from "../../../../queries/queries";
import {ContractImg} from "../../../ui/Icons";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "../../../../assets/scss/licenses.css"
import {getDate} from "../../../ui/Helpers";
import {Client} from "../../../../queries/Services";
import {Spinner3} from "../../../ui/Spinner";
import Licenses from "./licenses/Licenses";
import {useQuery} from "@apollo/client";
import ContractBuyDetails from "./ContractBuyDetails";
import {setUser} from "../../../../reducer/user/user.actions";
import TestLicenses from "./licenses/TestLicenses";
import Error from "../../../ui/errors/error/Error";


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
        if (loading) return <Spinner3/>
        if (error) return <Error contractError={error.toString()}/>
        if (data) {
            const contract=data.smartContractById;
            return    <div className={"contractContainer flex"}>
                <ContractBuyDetails contract={contract} logged_session={props.logged_session}  {...props} user={props.currentUser}/>
                <div className={"contractLeft"}>
                    <div className={'flex'}>
                        <ContractImg
                            position={"unset"}
                            imagePath={contract.image}
                            height={"160px"} width={"160px"}
                            margin={'50px'}
                        />
                        <div>
                            <h2>{contract.contractName.toUpperCase()}</h2>
                            <span>{getDate(contract.publishingDateTime)}</span>
                            <div className={'fa-icon'}>
                                <Icon name='facebook f' inverted bordered/>
                                <Icon name='twitter'  inverted bordered/>
                                <Icon name='linkedin'  inverted bordered/>
                            </div>
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
                        </div>
                    </div>
                    <div>
                       <div className={'flex'}>
                           <Avatar  src={contract.publisher.avatar} style={{marginRight:'40px'}}/>
                           <h3>{contract.publisher.fullName}</h3>
                       </div>
                        <Divider/>
                        <label><strong>Description</strong></label>
                        <p>{contract.description}</p>
                    </div>
                    <Licenses contract={contract} logged_session={props.logged_session}  {...props} user={props.currentUser}/>
                    <TestLicenses contract={contract} logged_session={props.logged_session}  {...props} user={props.currentUser}/>
                </div>
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
export default compose(connect(mapStateToProps, {setUser})) (DetailedContract)
