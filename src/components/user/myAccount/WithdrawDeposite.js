import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';


class WithdrawDeposite extends Component {
    state={
        copied:false
    }
    change=()=>{
        this.setState({copied:true})
    }
    render() {
        setTimeout(function(){
            this.setState({copied:false});
        }.bind(this),10000);
        return (
            <AccountLayout>
                <div className={"deposite"}>
                    <h2>Deposite</h2>
                    <div className={"flex"}>
                        <span>Address</span>
                        <p className={"address"}>{this.props.currentUser.address}</p>
                        <CopyToClipboard text={this.props.currentUser.address}>
                            <a onClick={this.change} href={"#"}>{this.state.copied?"Copied":"copy"}</a>
                        </CopyToClipboard>
                    </div>
                    <h4>Scan QR</h4>
                    <div className={"flex QR"}>
                        <QRCode  size={200} value={this.props.currentUser.address} />
                        <p>Scan the QR Code to deposit Dapps</p>
                    </div>
                </div>
                <Divider/>
                <div className={"withdraw"}>
                    <h2>Withdraw</h2>
                </div>
            </AccountLayout>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});
export default connect(mapStateToProps)(WithdrawDeposite);
