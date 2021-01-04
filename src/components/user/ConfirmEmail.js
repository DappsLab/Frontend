import React, {Component} from 'react';
import {confirmEmail} from "../../queries/queries";
import {graphql} from "react-apollo";
import {Button} from "semantic-ui-react";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import logo from '../../assets/images/dappslab-logo.png'
import square from '../../assets/images/Rectangle2.png'
import rectangle from '../../assets/images/Rectangle3.png'
import "../../assets/scss/confirm_email.css"

class ConfirmEmail extends Component {
    state={
        token:"",
        loading:false,
    }
    componentDidMount() {
        const token=this.props.match.params.key;
        this.setState({token:token},()=>{})
    }

    handleConfirm=()=>{
        const that=this;
        this.setState({loading:true})
        this.props.mutate({
            variables:{token:this.state.token}
        }).then(function(result) {
            if (result.data.confirmEmail) {
                that.setState({loading: false});
                that.props.history.push('/login');
                const alert = that.props.alert;
                alert.success("Email varified Successfully", {timeout: 5000});
            }else {
                console.log(result)
                that.setState({loading: false});
            }
        }).catch(e=>{
            that.setState({loading:false});
            that.props.history.push('/login');
            const alert = that.props.alert;
            alert.error(e.toString(), {timeout: 10000});
        });
    }
    render() {
        return (
            <div className={"password_container"} style={{height:window.innerHeight}}>
                <div className={"confirm_email flex"}>
                    <div className={'confirm_left'}>
                        <div>
                            <h1>Welcome in DappsLab</h1>
                            <p>
                                Thanks for registering an account with DappsLab.
                            </p>
                        </div>
                        <img src={square}/>
                    </div>
                    <div className={'confirm_right'}>
                        <img src={logo}/>
                        <div className={'flex'}>
                            <p>  Before we get started, we'll need
                                to verify your email. Simply click button below to varify your email address</p>
                            <Button fluid onClick={this.handleConfirm} >Varify email address</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(graphql(confirmEmail),withAlert()) (ConfirmEmail);