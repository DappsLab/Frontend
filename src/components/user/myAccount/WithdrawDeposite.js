import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {connect} from "react-redux";


class WithdrawDeposite extends Component {
    render() {
        return (
                <AccountLayout>
                    <div className={"deposite"}>
                        <h2>Deposite</h2>
                        <div className={"flex"}>
                            <span>Address</span>
                            <p>{this.props.currentUser.address}</p>
                            <a href={"#"}>copy</a>
                        </div>
                        <div className={"flex"}>
                            <QRCode  size={200} value={this.props.currentUser.address} />
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
