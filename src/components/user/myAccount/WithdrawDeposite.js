import React, {Component} from 'react';
import {Divider} from "@material-ui/core";
import QRCode from 'react-qr-code';
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Popup,Button} from "semantic-ui-react";


class WithdrawDeposite extends Component {
    state={
        copied:false,
        currentUser: this.props.currentUser,
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     setTimeout(function(){
    //         this.setState({copied:false});
    //     }.bind(this),10000);
    // }

    change=()=>{
        this.setState({copied:true})
    }
    render() {

        const {currentUser}=this.state
        return (
            <div>
                <div className={"deposite"}>
                    <h2>Deposite</h2>
                    <div className={"flex"}>
                        <span>Address</span>
                        <p className={"address"}>{currentUser.address}</p>
                        <CopyToClipboard text={currentUser.address}>
                            <Popup
                                content='Copied'
                                mouseLeaveDelay={1000}
                                on='click'
                                trigger={<button>copy</button>}
                            />

                        </CopyToClipboard>
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
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});
export default connect(mapStateToProps)(WithdrawDeposite);
