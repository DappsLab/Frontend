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



class  DetailedContract extends Component{

    state= {
        radioValue:"onePrice",
    }
    btn_links= [
        {title :"Buy contract",linkTo:"/buy_contract"},
        {title :"Test contract",linkTo:"/test_contract"}
    ]
    color=[
        {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
    ]
    // handleChange = (event) => {
    //     this.setState({radioValue:event.target.value});
    //     console.log(event.target.value)
    // };
    handleChange = (event) => {
        this.setState({radioValue:event.target.value});
    };
    renderButton=()=>(
        this.btn_links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <Button className={"testbtn"}>{link.title}</Button>
            </Link>
        ))
    )
    handleRadio(){
        const contractData=this.props.data.smartContractById;
        console.log("now")
        if(contractData){
            console.log("here")
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
    render() {
        console.log(this.props)
        const {radioValue}=this.state;
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
                                {this.renderButton()}
                            </div>
                            </div>
                        </Fade>
                    </div>
                }
            </Layout>
        );
    }
}
export default compose(graphql(contractById, {
    options: (props) => {
        return {
            variables: {
                id:props.match.params.id
            }
        }
    }}),
) (DetailedContract)
