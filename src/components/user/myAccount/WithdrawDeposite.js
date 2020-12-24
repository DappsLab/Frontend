import React, {Component} from 'react';
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Popup,Button} from "semantic-ui-react";
import AccountLayout from "../../../hoc/AccountLayout";

const timeoutLength = 2500
class WithdrawDeposite extends Component {
    state={
        isOpen:false,
        currentUser: this.props.currentUser,
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     setTimeout(function(){
    //         this.setState({copied:false});
    //     }.bind(this),10000);
    // }


    handleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
        this.timeout = setTimeout(() => {
            this.setState({ isOpen: !this.state.isOpen })
        }, timeoutLength)
    }

    render() {

        const {currentUser}=this.state
        return (
            <AccountLayout {...this.props}>
                <div className={"deposite"}>
                    <h2>Deposite</h2>
                    <div className={"flex"}>
                        <span>Address</span>
                        <p className={"address"}>{currentUser.address}</p>

                            <Popup
                                content={`Copied`}
                                on='click'
                                open={this.state.isOpen}
                                trigger={
                                    <CopyToClipboard text={currentUser.address}>
                                        <button onClick={this.handleOpen}>copy</button>
                                    </CopyToClipboard>
                                }
                            >
                            </Popup>

                    </div>
                    <h4>Scan QR</h4>
                    <div className={"flex QR"}>
                        <QRCode  size={200} value={currentUser.address} />
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
