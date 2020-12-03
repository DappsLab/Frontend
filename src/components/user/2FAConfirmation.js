import React, {Component} from 'react';
import {Grid, Form, Segment, Input} from 'semantic-ui-react'
import fa from "../../assets/images/fa.png"
import {gql} from "@apollo/client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {withAlert} from "react-alert";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";
import {Spinner2} from "../ui/Spinner";


const number=RegExp(/^[0-9]*$/);
class FAConfirmation extends Component {
    state={
        value:"",
        loading:false
    }
     client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: this.props.match.params.token,
    }
});
    onChange=(event)=>{
        const {name,value}=event.target;
        let token_value="";
        const that=this;
        const alert = this.props.alert;
        if (name==="value"){
            if (number.test(value)){
                if (value.length<7) {
                    token_value=value;
                    this.setState({[name]: value}, () => {});
                    if (value.length===6){
                        this.setState({loading:true})
                        this.client.query({
                            query: gql`query ($token:String!){
                                verify2FA(token:$token)
                            }`, variables: {token:token_value}
                        }).then(result => {
                            that.setState({value:""})
                            if (result.data.verify2FA){
                                that.client.query({
                                    query: gql`query {
                                        me{
                                            avatar address fullName id type twoFactorCode
                                            email location userName twoFactorEnabled balance
                                            kyc{   birthDate
                                                building city country kycStatus mobile
                                                nationality postalCode street kycStatus
                                            }
                                            orders{
                                                id dateTime fee price status transactionHash
                                                orderUsed smartContract {
                                                    contractName
                                                }
                                            }
                                            purchasedContracts {
                                                customizationsLeft id unlimitedCustomization
                                                licenses {
                                                    purchaseDateTime id used
                                                    order {
                                                        id status licenseType
                                                        smartContract {
                                                            id contractName image
                                                        }
                                                    }

                                                }
                                                smartContract {
                                                    contractName id
                                                }
                                            }
                                        }
                                    }`
                                }).then(result => {
                                    console.log(result.data.me)
                                    that.setState({loading:false})
                                    that.props.setUser(result.data.me);
                                    alert.success("Login Successfully", {timeout:5000})
                                    localStorage.setItem("token",that.props.match.params.token)
                                    that.props.history.push('/')
                                }).catch(e => {
                                    that.setState({loading:false})
                                    alert.error("Try again", {timeout:1000})
                                });

                            }else {
                                alert.error("Try again", {timeout:1000})
                                that.setState({loading:false})
                            }
                        }).catch(e=>{
                            console.log(e.toString())
                            that.setState({loading:false})
                        })
                    }
                }
            }
        }
    }
    render() {
        const {loading,value}=this.state

        return  loading?<Spinner2/>:(
            <Grid textAlign="center"  verticalAlign='middle'>
                <Grid.Column  style={{maxWidth:700}}>
                  <Segment className={"fa_container"}>
                      <img src={fa} alt={"name"}/>
                      <h2>Two-step varification</h2>
                      <p>Enter a code from Google Authenticator to make sure everything works</p>
                      <Form>
                          <Form.Field>
                              <label>Your Varification Code</label>
                              <Input
                                  value={value}
                                  onChange={this.onChange}
                                  name={"value"}
                                  placeholder='6-digits code'
                                  type={"text"}
                              />
                          </Form.Field>
                          {/*<Button onClick={this.cancel}>*/}
                          {/*    <Icon name={"close"}/>Varify*/}
                          {/*</Button>*/}
                      </Form>
                  </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default  compose(
    connect(null, {setUser}),withAlert(),
)(FAConfirmation);