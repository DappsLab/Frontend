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



class  DetailedContract extends Component{

    state= {
        radioValue:"SINGLELICENSE",
        kyc:this.props.logged_session?this.props.currentUser.kyc:"null",
        fee: 0.01201,
    }
    color=[
        {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
    ]
    handleChange = (event) => {
        this.setState({radioValue:event.target.value});
    };
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
                               start: 0.01201,
                               min: 0.00123647,
                               max: 0.21111,
                               step: 0.01,
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
                        disabled label={{ basic: true, content: 'Eth' }}
                        value={this.state.fee}
                    />
                </Form.Field>
            </Form>
        }
    }
    feeProcessTime(){
        if (this.state.fee<0.04123648){
            return " Maximum time"
        }else if (this.state.fee<0.11123647){
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
                            return <Link   to={`/search_result/${category}`} >
                            <Button
                                size={"mini"}
                                color={this.color["0"][index]} key={category}>
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
            if (this.state.kyc.kycStatus==="VERIFIED") {
               return <Button fluid onClick={this.handleBuy} className={"testbtn"}>Buy contract</Button>
            }else {
                return <Container fluid className={"kyc_information"}>
                    <p>Before you can purchase this contract, you have to complete your KYC information and get validated.</p>
                     <Button fluid onClick={this.handleBuy} className={"testbtn"}>Verify your Account</Button>
                </Container>
            }
        }
    }


    handleBuy=()=>{
        const {radioValue,fee}=this.state;
        const contractData=this.props.data.smartContractById;
        this.props.orderContract({
            variables:{
                fee: "21000",
                id:contractData.id,
                type:radioValue
            }
        })
        console.log(this.props)
    }
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
                                <Button fluid className={"testbtn"}>Test contract</Button>
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
    connect(mapStateToProps),
) (DetailedContract)
