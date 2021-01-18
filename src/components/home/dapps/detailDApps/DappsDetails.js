import React from 'react';
import '../../../../assets/scss/dapp_details.css'
import Layout from "../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {dappsbyid} from "../../../../queries/queries";
import {Button} from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import {categoryColors, getDate} from "../../../ui/Helpers";
import {connect} from 'react-redux'
import BuyDapp from "./BuyDapp";


const DappsDetails = (props) => {
    const RenderData=()=> {
        const {loading, error, data} = useQuery(dappsbyid, {
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
            const dapp=data.dAppById;
            return <div className={'detail-container flex'}>
                <div className={"dapps-details"}>
                    <Avatar src={dapp.image} style={{borderRadius:0,height:"150px",width:"150px"}}/>
                    <h2>{dapp.dAppName}</h2>
                    <div>
                        <span>Created at </span>
                        <span>{getDate(dapp.publishingDateTime)}</span>
                    </div>
                    <div className={'dapp-category'}>
                        {dapp.dAppCategory.map(category=>{
                            return <Button
                                size={'mini'}
                                key={category}  style={{backgroundColor:`${categoryColors(category)}`}}
                                className={`card_tag`} > {category}
                            </Button>
                        })}
                    </div>
                    <h3>Description</h3>
                    <p>{dapp.description}</p>
                    <h4>Created By  <span>{dapp.publisher.fullName}</span></h4>
                    <Avatar src={dapp.publisher.avatar} style={{height:"100px",width:"100px"}} />
                </div>
                <BuyDapp id={dapp.id} price={dapp.singleLicensePrice} {...props} currentUser={props.currentUser}/>
            </div>
        }
    }
    return (
        <Layout>
            {RenderData()}
        </Layout>
    );
};
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});
export default connect(mapStateToProps)(DappsDetails);