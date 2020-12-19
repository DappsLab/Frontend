import React, {Component} from 'react';
 import  '../../../assets/scss/detailed_contract.css';
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Button, Container, Divider, Form, Icon, Input, Loader, Segment} from 'semantic-ui-react'
import Radio from '@material-ui/core/Radio';
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";
import {orderContract, contractById, me_Query} from "../../../queries/queries";
import {ContractImg} from "../../ui/Icons";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import { Slider } from "react-semantic-ui-range";
import {Link} from "react-router-dom";
import {ApolloClient,gql, InMemoryCache} from "@apollo/client";
import {withAlert} from "react-alert";
import {setUser} from "../../../actions/Actions";
import "../../../assets/scss/licenses.css"
import {getDate} from "../../ui/Helpers";


class  DetailedContract extends Component{

    state= {
        radioValue:"SINGLELICENSE",
        currentUser:this.props.user,
        kyc:this.props.user?this.props.user.kyc:'null',
        fee: 100000,
        buy_loading:false,
        showLicenses:false,
    }
    color=[
        {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
    ]
    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                currentUser: this.props.currentUser,
                kyc:this.props.currentUser.kyc
            });
        }
    }
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
                <span>{getDate(contractData.publishingDateTime)}</span>
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
        if (this.props.logged_session){
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

    meQuery=()=>{
        const that=this;
       return  that.Authclient.query({
            query: me_Query
        })
    }
    handleBuy=()=>{
        const that=this;
        const alert=this.props.alert;
        this.setState({buy_loading:true});
        const {radioValue,fee}=this.state;
        const contractData=this.props.data.smartContractById;
        this.props.orderContract({
            variables:{
                producttype:'SMARTCONTRACT',
                fee: fee.toString(),
                id:contractData.id,
                type:radioValue
            }
        }).then(function (result){

            if (result.data.placeOrder) {
                const orderId=result.data.placeOrder.id;
                that.client.query({
                    query: gql`query  ($id:ID!){
                        verifyOrder(id: $id)
                    }`,variables: {id: orderId}
                }).then(result => {
                        if (result.data.verifyOrder){
                        that.Authclient.mutate({
                            mutation:gql`
                                mutation ($SID:String!,$OID:String!){
                                    purchaseContract(newPurchase: {smartContractId:$SID, orderId: $OID}) {
                                        createdAt
                                    }
                                }
                            `,variables:{SID:contractData.id,OID:orderId}
                        }).then(result=>{
                            that.meQuery().then(result => {
                                that.props.setUser(result.data.me);
                                that.setState({currentUser:result.data.me,buy_loading: false},()=>{});
                                alert.success("License Purchased Successfully", {timeout:2000})
                                that.props.history.push("/dashboard/purchased_contracts")
                            }).catch(e => {
                                console.log(e);
                                that.meQuery().then(result => {
                                    that.props.setUser(result.data.me);
                                    alert.success("Purchased Failed", {timeout:5000})
                                    alert.error("Order Successfully", {timeout:5000})
                                    that.setState({currentUser:result.data.me,buy_loading:false},()=>{})
                                    that.props.history.push("/dashboard/ordered_contract")
                                }).catch(e => {
                                    console.log(e)
                                    alert.error(e.toString(),{timeout:5000})
                                    that.setState({buy_loading: false})
                                });
                            });
                        }).catch(e=>{
                            console.log(e)
                            that.setState({buy_loading: false})
                            alert.error(e.toString(),{timeout:2000})
                            that.meQuery().then(result => {
                                that.props.setUser(result.data.me);
                                alert.success("Order Successfully", {timeout:2000})
                                that.setState({buy_loading:false})
                                that.props.history.push("/dashboard/ordered_contract")
                            }).catch(e => {
                                console.log(e)
                                that.setState({buy_loading: false})
                                alert.error(e.toString(),{timeout:5000})
                            });
                        })
                    }else {
                        that.meQuery().then(result => {
                            that.props.setUser(result.data.me);
                            alert.success("Order Successfully", {timeout:2000})
                            that.setState({buy_loading:false})
                            that.props.history.push("/dashboard/ordered_contract")
                        }).catch(e => {
                            console.log(e)
                            that.setState({buy_loading: false})
                            alert.error(e.toString(),{timeout:5000})
                        });
                    }
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
    }
    Authclient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem("token"),
        }
    });
    renderLicenses(currentUser){
        const purchased=currentUser.purchasedContracts;
        if (purchased.length>0){
            for (let i=0;i<purchased.length;i++){
                if (purchased[i].smartContract.id===this.props.match.params.id){
                    return <div> <Segment className={'licenses_header'}>
                        <div>
                            <h2 className={"flex"}>
                                <Icon circular inverted color='blue' size={'large'}  name={'shopping cart'}/>
                                Licenses
                            </h2>
                             <span>Customization Left: {purchased[i].unlimitedCustomization?"Unlimited Customizations":purchased[i].customizationsLeft}</span>
                        </div>
                        <div className={'flex'}>
                            <span>{purchased[i].licenses.length}</span>
                            <div onClick={()=>{this.setState({showLicenses: !this.state.showLicenses})}}>
                                <Icon link size={'large'} name={`chevron ${this.state.showLicenses?"up":"down"}`}/>
                            </div>
                        </div>
                    </Segment>
                        { this.state.showLicenses&&purchased[i].licenses.map(license=>{
                            return <div key={license.purchaseDateTime}>
                                <div className={"licenses flex"} >
                                    <Icon circular inverted color='blue'  name={'checkmark'}/>
                                    <Segment className={'flex'}>
                                        <div>
                                            <h2>{license.order.licenseType}</h2>
                                            <span>Order ID :{license.order.id}</span><br/>
                                            <span>Purchased on {license.purchaseDateTime}</span>
                                        </div>
                                        <div>
                                            {license.order.licenseType==="SINGLELICENSE" && license.used ?
                                                ""
                                                :<Button onClick={() => {
                                                    this.props.history.push(`/compile/${license.id}`)
                                                }}>Compile</Button>
                                            }
                                        </div>
                                    </Segment>
                                </div>
                                {license.used?
                                    <Segment className={"compiled"}>
                                        <div>
                                            <img src={license.order.smartContract.image} alt={"img"}/>
                                            <h3>{license.order.smartContract.contractName}</h3>
                                        </div>
                                         <Button color={'green'} onClick={() => {
                                             // this.props.history.push(`/compile/${license.id}`)
                                         }}>Deploy</Button>
                                    </Segment>:""
                                }
                            </div>
                        })}
                    </div>
                }
            }
        }

    }
    render() {
        const {radioValue,currentUser,kyc}=this.state;
        return (
            <Layout>
                {this.props.data.loading?<div className={"all-contract"}>
                        <Loader content={"Loading Details"} active size={'big'}/>
                    </div>:(this.props.data.smartContractById===null?
                    <div>Not Found</div>:
                    <div className={"contractContainer flex"}>
                        <Fade top delay={300}>
                            <div>
                                {this.handleContractDetail()}
                                {currentUser&&this.renderLicenses(this.state.currentUser)}
                            </div>
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
                                {this.props.user?<Button fluid onClick={()=>{this.props.history.push(`/test_smart_contract/${this.props.match.params.id}`)}} className={"testbtn"}>Test contract</Button>:""}
                            </div>
                            </div>
                        </Fade>
                    </div>
                )}
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
