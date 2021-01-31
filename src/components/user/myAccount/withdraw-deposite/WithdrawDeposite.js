import React, {useState} from 'react';
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Form} from "semantic-ui-react";
import AccountLayout from "../../../../hoc/AccountLayout";
import {withAlert} from "react-alert";
import Withdraw from "./withdraw.component";
import {me_Query} from "../../../../queries/queries";
import {Query} from "react-apollo";
import {Spinner2} from "../../../ui/Spinner";
import CustomButton from "../../../ui/custom-button/custom-button.component";


// const timeoutLength = 2500
const WithdrawDeposite =(props)=>{
    // const [isOpen,setIsOpen]=useState(true);
    const [currentUser,setCurrentUser]=useState(null)
    const {user,alert,history}=props

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
                            <CustomButton onClick={()=>{history.push('/metamask')}} metamask>Connect to MetaMask</CustomButton>
                        </Form>
                        <Query query={me_Query} fetchPolicy={'network-only'} onCompleted={
                            data => {
                                setCurrentUser(data.me)
                            }}>
                            {({loading,error,data})=>{
                                if(loading) return <Spinner2/>
                                if (error) return <p>{error.toString()}</p>
                                if (data&&currentUser) {
                                    return <div className={"withdraw"}>
                                        <h2>Current Balance</h2>
                                        <div className={'balance'}>
                                            <h3>Dapps Coin</h3>
                                            <span>Balance: {currentUser.balance}</span>
                                        </div>
                                    </div>
                                }else {
                                     return <p>Refresh</p>
                                }
                            }}
                        </Query>
                        <div className={"withdraw"}>
                            <h2>Withdraw</h2>
                            <Withdraw {...props}/>
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
