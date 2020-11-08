import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import Switch from '@material-ui/core/Switch';
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import {disable2FA, enableFA} from "../../../queries/queries";
import Spinner from "../../ui/Spinner";
import {connect} from "react-redux";


class TwoFA extends Component {
    state ={
        currentUser: this.props.currentUser,
        enableCheck:false,
        enableData:[],
        loading:false,
    }
    handleChange=(event)=>{
        const that=this;
        this.setState({loading:true})
        const value=event.target.checked;
        if (event.target.checked){
            this.props.enableFA().then(result=>{
                that.setState({loading:false,enableCheck:value,enableData:result.data.enable2FA})
            }).catch(error=>{
                console.log(error)
            })
        }else {
            this.props.disableFA().then(result=>{
                that.setState({loading:false,enableCheck:value})
                console.log(result)
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    componentDidMount() {
        if (this.props.currentUser) {
            this.setState({
                currentUser: this.props.currentUser
            });
        }
    }
    handleQR(){
        const {enableCheck,enableData}=this.state
        console.log(enableData)
        if (enableCheck){
            return <div className={"flex QR"}>
                <img   src={enableData.twoFactorCode}  alt={""}/>
                <p>Open the Google Authenticator app and scan this QR code</p>
            </div>
        }else {
            return <div> </div>
        }
    }
    render() {
        console.log(this.props)
        const {loading,enableCheck}=this.state;
        return  loading?<Spinner/>:(
                <AccountLayout>
                    <h2>Enable 2FA</h2>
                    <Switch
                        checked={enableCheck}
                        onChange={this.handleChange}
                        name="enableCheck"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    {this.handleQR()}
                </AccountLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser,
})
export default   compose(
    graphql(enableFA,{name:"enableFA"}),
    graphql(disable2FA,{name:"disableFA"}),connect(mapStateToProps),
)(TwoFA);
