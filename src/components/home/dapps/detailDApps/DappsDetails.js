import React, {useState} from 'react';
import '../../../../assets/scss/dapp_details.css'
import Layout from "../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {dappsbyid} from "../../../../queries/queries";
import {Button, Container, Segment} from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import {categoryColors, getDate} from "../../../ui/Helpers";
import {dappSource} from '../../uploadContract/editSmartContract/GetSource'
import {connect} from 'react-redux'


const DappsDetails = (props) => {
    const [currentUser,setCurrentUser]=useState(props.currentUser);
    console.log(props)
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
            console.log(data.dAppById)
            return <div className={'detail-container flex'}>
                <Segment className={"dapps-details"}>
                    <Avatar src={dapp.image} style={{borderRadius:0,height:"150px",width:"150px"}}/>
                    <h2>{dapp.dAppName}</h2>
                    <div>
                        <span>Created at </span>
                        <span>{getDate(dapp.publishingDateTime)}</span>
                    </div>
                    <div className={'dapp-category'}>
                        {dapp.dAppCategory.map(category=>{
                            return <Button size={'mini'}
                                           key={category}  style={{backgroundColor:`${categoryColors(category)}`}}
                                           className={`card_tag`} >
                                {category}
                            </Button>
                        })}
                    </div>
                    <h3>Description</h3>
                    <p>{dapp.description}</p>
                    <h4>Created By  <span>{dapp.publisher.fullName}</span></h4>
                    <Avatar src={dapp.publisher.avatar} style={{height:"100px",width:"100px"}} />
                </Segment>
                <Segment className={"buy-dapps"}>
                    <h2>Buy Dapp</h2>

                    {currentUser?(
                        currentUser.kyc.kycStatus==="VERIFIED"&&
                         <Button loading={this.state.buy_loading} fluid onClick={this.handleBuy} className={"testbtn"}>Buy contract</Button>
                    ): <Container fluid className={"kyc_information"}>
                        <p>Before you can purchase this contract, you have to complete your KYC information and get validated.</p>
                        <Button  fluid onClick={()=>{this.props.history.push('/account_settings')}} className={"testbtn"}>Verify your Account</Button>
                    </Container>
                    }
                    <Button>Buy Dapp</Button>
                </Segment>
            </div>
        }
    }

        // console.log(data, dAppById)
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