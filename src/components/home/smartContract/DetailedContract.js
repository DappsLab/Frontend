import React, {Component} from 'react';
 import  '../../../assets/scss/detailed_contract.css';
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Button, Divider, Form, Icon, Input, Loader} from 'semantic-ui-react'
import Radio from '@material-ui/core/Radio';
import {Link} from "react-router-dom";
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";
import {contractById} from "../../../queries/queries";
import {ContractImg} from "../../ui/Icons";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";



class  DetailedContract extends Component{

    state= {
        radioValue:"onePrice",
        kyc:this.props.currentUser.kyc
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
                    <FormControlLabel className={"radio"} value={"onePrice"} control={<Radio />}   label={""}/>
                    <Input
                        fluid size={'large'} name={"onePrice"}
                         disabled label={{ basic: true, content: 'Dapps' }}
                        value={contractData.singleLicensePrice}/>
                </Form.Field>
                <Form.Field className={" flex"}>
                    <FormControlLabel className={"radio"}  value={"unlimited"} control={<Radio />}   label={""}/>
                    <Input
                        fluid size={'large'} name={"unlimited"}
                        disabled label={{ basic: true, content: 'Dapps' }}
                        value={contractData.unlimitedLicensePrice}/>
                </Form.Field>
                <Divider/>
                <Form.Field>
                    <label>Total amount</label>
                    <Input
                        fluid size={'large'}
                        disabled label={{ basic: true, content: 'Dapps' }}
                        value={this.state.radioValue==="unlimited"?
                            contractData.unlimitedLicensePrice
                            :contractData.singleLicensePrice}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Fee</label>
                    <Input
                        fluid size={'large'}
                        disabled label={{ basic: true, content: 'Eth' }}
                        value={""}
                    />
                </Form.Field>
            </Form>
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
                            return <Button
                                size={"mini"}
                                color={this.color["0"][index]} key={category}>
                                {category}</Button>
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
        if (this.props.logged_session){
            if (this.state.kyc.kycStatus==="VERIFIED") {
               return <Button fluid onClick={this.handleBuy} className={"testbtn"}>Buy contract</Button>
            }
        }
    }
    handleBuy=()=>{
        
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
                            <div className={"btnGroups flex"}>
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
    }}), connect(mapStateToProps),
) (DetailedContract)
