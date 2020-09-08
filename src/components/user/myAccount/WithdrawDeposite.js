import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';


class WithdrawDeposite extends Component {
    render() {
        return (
                <AccountLayout>
                    <div className={"deposite"}>
                        <h2>Deposite</h2>
                        <div className={"flex"}>
                            <span>Address</span>
                            <p>Deposite Address</p>
                            <div>copy</div>
                        </div>
                        <QRCode size={200} value="Deposite Address" />
                    </div>
                    <Divider/>
                    <div className={"withdraw"}>
                        <h2>Withdraw</h2>
                    </div>
                </AccountLayout>
        );
    }
}

export default WithdrawDeposite;
