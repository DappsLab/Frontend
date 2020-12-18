import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import {disable2FA, enableFA} from "../../../queries/queries";
import {Loader} from "semantic-ui-react"
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

class TwoFA extends Component {
    state ={
        currentUser: this.props.currentUser,
        loading:false,
    }
    client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem('token'),
        }
    });
    handleQuery=()=>{
        const that=this;
        this.client.query({
            query: gql`query {
                me{
                    avatar address fullName id type twoFactorCode
                    email location userName twoFactorEnabled balance
                    smartContracts {
                        id contractName createdAt description verified
                        image source  unlimitedLicensePrice singleLicensePrice
                        contractCategory publishingDateTime
                    }
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
                            contractName id  purchasedCounts contractCategory
                            publisher {
                              fullName
                            }
                        }
                    }
                }
            }`
        }).then(result => {
            that.props.setUser(result.data.me);
            console.log(result.data.me)
            that.setState({loading:false,currentUser:result.data.me})
        }).catch(e => {
            that.setState({loading:false})
            console.log("inner",e.toString())
        });
    }
    handleChange=(event)=>{
        const that=this;
        this.setState({loading:true})
        const value=event.target.checked;
        if (value){
            this.props.enableFA().then(result=>{
                console.log("1" ,result);
                that.setState({loading:false,currentUser:result.data.enable2FA})
            }).catch(error=>{
                console.log("outer",error.toString())
                that.setState({loading:false})
            });
        }else {
            this.props.disableFA().then(result=>{
                console.log("0",result);
                that.handleQuery();
            }).catch(error=>{
                console.log(error)
            })
        }

    }
    render() {
        const {loading,currentUser}=this.state;
        return  loading?<Loader active/>:(
                <div>
                    <h2>Enable 2FA</h2>
                    <Switch
                        checked={currentUser.twoFactorEnabled}
                        onClick={this.handleChange}
                        name="enableCheck"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    {currentUser.twoFactorEnabled&&<div className={"flex QR"}>
                        <img   src={currentUser.twoFactorCode}  alt={""}/>
                        <p>Open the Google Authenticator app and scan this QR code</p>
                    </div>
                    }
                </div>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default   compose(
    connect(mapStateToProps, {setUser}),
    graphql(enableFA,{name:"enableFA"}),
    graphql(disable2FA,{name:"disableFA"}),connect(mapStateToProps),
)(TwoFA);
