import React, { useState} from 'react';
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Form, Popup} from "semantic-ui-react";
import AccountLayout from "../../../hoc/AccountLayout";
import {withAlert} from "react-alert";

const timeoutLength = 2500
const WithdrawDeposite =(props)=>{
    const [isOpen,setIsOpen]=useState(false);
    const {user,alert}=props

    return (
            <AccountLayout {...props}>
                <div className={"deposite"}>
                    <div className={'deposite-right'}>
                        <h2>Deposite</h2>
                        <Form>
                            <Form.Field className={'address'}>
                                <Form.Input
                                    disabled label={'Address'} value={user.address}
                                />
                                <CopyToClipboard text={user.address}>
                                    <label className={'copied'} onClick={()=>{alert.success("Copied",{timeout:1000})}}> copy</label>
                                </CopyToClipboard>
                            </Form.Field>
                        </Form>
                        <div className={"withdraw"}>
                            <h2>Withdraw</h2>
                            <div className={'balance'}>
                                <h3>Dapps Coin</h3>
                                <span>Balance: {user.balance}</span>
                            </div>

                            <button className={'withdrawbtn'}>Withdraw</button>
                        </div>
                    </div>
                    <div className={"QR"}>
                        <div>
                            <h3>Scan QR</h3>
                            <QRCode  size={200} value={user.address} />
                            <p>Scan the QR Code to deposit Dapps</p>
                        </div>
                    </div>
                </div>
                <Divider/>

            </AccountLayout>
        );
}
export default withAlert()(WithdrawDeposite);
