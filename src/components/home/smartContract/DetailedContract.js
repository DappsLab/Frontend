import React, {Component} from 'react';
 import  '../../../assets/scss/detailed_contract.css';
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Button,Container, Divider, Form, Icon, Input, Loader} from 'semantic-ui-react'
import Radio from '@material-ui/core/Radio';
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";
import {orderContract, contractById} from "../../../queries/queries";
import {ContractImg} from "../../ui/Icons";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import { Slider } from "react-semantic-ui-range";
import {Link} from "react-router-dom";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {withAlert} from "react-alert";
import {setUser} from "../../../actions/Actions";



class  DetailedContract extends Component{

    state= {
        radioValue:"SINGLELICENSE",
        kyc:this.props.currentUser||this.props.user?(this.props.user===null?this.props.currentUser.kyc:this.props.user.kyc):"null",
        fee: 100000,
        buy_loading:false
    }
    color=[
        {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
    ]
    handleChange = (event) => {
        this.setState({radioValue:event.target.value});
    };
    client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem('token'),
        }
    });
    handleRadio(){
        const contractData=this.props.data.smartContractById;
        if(contractData){
            return <Form className={"radio_detials"}>
                <Form.Field className={"flex"}>
                    <FormControlLabel className={"radio"} value={"SINGLELICENSE"} control={<Radio />}   label={""}/>
                    <Input
                        fluid size={'large'} name={"SINGLELICENSE"}
                         disabled label={{ basic: true, content: 'Dapps' }}
                        value={contractData.singleLicensePrice}/>
                </Form.Field>
                <Form.Field className={" flex"}>
                    <FormControlLabel className={"radio"}  value={"UNLIMITEDLICENSE"} control={<Radio />}   label={""}/>
                    <Input
                        fluid size={'large'} name={"UNLIMITEDLICENSE"}
                        disabled label={{ basic: true, content: 'Dapps' }}
                        value={contractData.unlimitedLicensePrice}/>
                </Form.Field>
                <Divider/>
                <Form.Field className={"slider flex"}>
                    <label>Set fee</label>
                    <Form.Group>
                       <Slider
                           color="green"
                           inverted={false}
                           settings={{
                               start: 100000,
                               min: 30000,
                               max: 999999,
                               step: 200,
                               onChange: value => {
                                   this.setState({
                                       fee: value
                                   });
                               }
                           }}
                       />
                       <p>This is the most amount of money that might be used to process this
                           transaction. Your transaction will be processed in the
                           <span>{this.feeProcessTime()}</span>
                       </p>
                   </Form.Group>
                </Form.Field>
                <Form.Field>
                    <label>Total amount</label>
                    <Input
                        fluid size={'large'}
                        disabled label={{ basic: true, content: 'Dapps' }}
                        value={this.state.radioValue==="UNLIMITEDLICENSE"?
                            contractData.unlimitedLicensePrice
                            :contractData.singleLicensePrice}
                    />
                </Form.Field>
                <Form.Field >
                    <label>Fee</label>
                    <Input
                        fluid size={'large'}
                        disabled label={{ basic: true, content: 'Wei' }}
                        value={this.state.fee}
                    />
                </Form.Field>
            </Form>
        }
    }
    feeProcessTime(){
        if (this.state.fee<300000){
            return " Maximum time"
        }else if (this.state.fee<700000){
            return " Medium time"
        }else {
            return " Minimum time"
        }
    }
    handleContractDetail(){
        const contractData=this.props.data.smartContractById;
        if(contractData){
            return <div className={"contractLeft"}>
                <ContractImg
                    position={"unset"}
                    imagePath={contractData.image}
                    height={"90px"} width={"90px"}
                />
                <h2>{contractData.contractName}</h2>
                <span>{contractData.publishingDateTime}</span>
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
                        {contractData.contractCategory.map((category, index) => {
                            return <Link  key={category}  to={`/search_result/${category}`} >
                            <Button
                                size={"mini"}
                                color={this.color["0"][index]} >
                                {category}</Button>
                            </Link>
                        })
                        }
                    </div>
                    <Divider/>
                    <label><strong>Description</strong></label>
                    <p>{contractData.description}</p>
                    <Avatar  src={contractData.publisher.avatar}/>
                    <h3>{contractData.publisher.fullName}</h3>
                </div>
            </div>
        }
    }
    renderBuy(){
        console.log(this.props.logged_session)
        if (this.props.logged_session){
            console.log(this.state.kyc)
            if (this.state.kyc.kycStatus==="VERIFIED") {
               return <Button loading={this.state.buy_loading} fluid onClick={this.handleBuy} className={"testbtn"}>Buy contract</Button>
            }else {
                return <Container fluid className={"kyc_information"}>
                    <p>Before you can purchase this contract, you have to complete your KYC information and get validated.</p>
                     <Button  fluid onClick={()=>{this.props.history.push('/account_settings')}} className={"testbtn"}>Verify your Account</Button>
                </Container>
            }
        }
    }

    handleBuy=()=>{
        const that=this;
        const alert=this.props.alert;
        this.setState({buy_loading:true});
        const {radioValue,fee}=this.state;
        const contractData=this.props.data.smartContractById;
        this.props.orderContract({
            variables:{
                fee: fee.toString(),
                id:contractData.id,
                type:radioValue
            }
        }).then(function (result){
            if (result.data.placeOrder) {
                console.log(result.data.placeOrder.id)
                that.client.query({
                    query: gql`query  ($id:ID!){
                        verifyOrder(id: $id)
                    }`,variables: {id: result.data.placeOrder.id}
                }).then(result => {
                    that.Authclient.query({
                        query: gql`query {
                            me{
                                avatar address fullName id type twoFactorCode
                                email location userName twoFactorEnabled balance
                                kyc{   birthDate
                                    building
                                    city
                                    country
                                    kycStatus mobile
                                    nationality
                                    postalCode
                                    street
                                    kycStatus
                                }
                                orders{
                                    id
                                    dateTime
                                    fee
                                    price
                                    smartContract {
                                        contractName
                                    }
                                    status
                                    transactionHash
                                }
                            }
                        }`
                    }).then(result => {
                        console.log(result)
                        that.props.setUser(result.data.me);
                        alert.success("ORDERED Successfully", {timeout:1000})
                        that.setState({buy_loading:false})
                    }).catch(e => {
                        console.log(e)
                        that.setState({buy_loading: false})
                    });

                }).catch(e => {
                    that.setState({buy_loading:false});
                    console.log(e.toString())
                    alert.error(e.toString(),{time:500});
                });
            }
        }).catch(function (error){
            that.setState({buy_loading:false});
            console.log(error.toString());
            alert.error(error.toString(),{time:500});
        })
        console.log(this.props)
    }
    Authclient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem("token"),
        }
    });
    render() {
        const {radioValue,kyc}=this.state;
        return (
            <Layout>
                {this.props.data.loading?<div className={"all-contract"}>
                        <Loader content={"Loading Details"} active size={'big'}/>
                    </div>:
                    <div className={"contractContainer flex"}>
                        <Fade top delay={300}>
                            {this.handleContractDetail()}
                        </Fade>
                        <Fade top delay={300}>
                            <div className={"contractRight"}>
                            <h3 className={"buy-top"}><span>Buy</span></h3>
                            <div className={"flex"}>
                                <FontAwesomeIcon className={"checkCircle"} icon={faCheckCircle}/>
                                <p>Reviewed by Dappslab</p>
                            </div>
                            <h4>Price</h4>
                            <FormControl component="fieldset" className={"fullWidth"}>
                                <RadioGroup aria-label="Price" name="price" onChange={this.handleChange} value={radioValue}>
                                    {this.handleRadio()}
                                </RadioGroup>
                            </FormControl>
                            <div className={`btnGroups flex ${kyc.kycStatus==="VERIFIED"?"flex-row":""}`}>
                                {this.renderBuy()}
                                {this.props.currentUser||this.props.user?<Button fluid className={"testbtn"}>Test contract</Button>:""}
                            </div>
                            </div>
                        </Fade>
                    </div>
                }
            </Layout>
        );
    }
}
const mapStateToProps=(state)=>({
    logged_session:state.user.logged_session,
    currentUser:state.user.currentUser
});
export default compose(graphql(contractById, {
    options: (props) => {
        return {
            variables: {
                id:props.match.params.id
            }
        }
    }}),
    graphql(orderContract,{name:"orderContract"}),
    connect(mapStateToProps,{setUser}), withAlert(),
) (DetailedContract)
