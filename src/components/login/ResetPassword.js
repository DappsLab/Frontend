import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import {forgetPassword} from '../../queries/queries'
import {Link} from 'react-router-dom'
import '../../assets/scss/reset_password.css'
import {graphql} from "react-apollo";
import { Spinner2} from "../ui/Spinner";
import {flowRight as compose} from 'lodash';
import logo from '../../assets/images/logo_dapps.png'
import  bar1 from '../../assets/images/bar1.png';
import Rectangle2 from '../../assets/images/Rectangle2.png'
import Rectangle3 from '../../assets/images/Rectangle3.png'
import {withAlert} from "react-alert";
import {TextField} from "@material-ui/core";
class ResetPassword extends Component {
    state = {
        email: "",
        loading:false
    }

    handleChange = event => {
        const {name,value}=event.target;
        this.setState({[name]:value},()=>{});
    }
    handleSubmit=()=>{
        const alert=this.props.alert
        const that=this;
        if (this.state.email!=="") {
            that.setState({loading:true})
            this.props.mutate({
                variables:{
                    email:this.state.email
                }
            }).then((result) => {
                that.setState({loading:false})
                that.props.history.push('/login')
                alert.success("Reset password link send to your provided Email ", {timeout: 7000})
            }).catch(e=>{
                that.setState({loading:false})
                const error=e.toString();
                alert.error(error,{timeout: 5000})
            })

        }else {
            alert.error("Field Required",{timeout:2000})
        }
    }
    render() {
        const {email,loading}=this.state;
        return (
            <Layout>
                <div className="register-wrapper">
                    {loading && <Spinner2/> }
                        <div className="password-wrapper">
                            <div className="password-right">
                                <div className="top">
                                    <div className="logo">
                                        <img src={logo} alt={"logo"}/>
                                    </div>
                                    <div className="btn">
                                        <Link to={'/login'} className="signup">Login</Link>
                                    </div>
                                </div>
                                <div className="form">
                                    <h2>Reset Password</h2>
                                    <img className="bar1" src={bar1} alt={""}/><br/>
                                    <p>
                                        Enter the email associated with your account and we’ll send an
                                        email with instructions to reset your password
                                    </p>
                                    <form autoComplete="off">
                                        <TextField
                                            label="Email" value={email} type={'email'} name={'email'}
                                            onChange={(event => this.handleChange(event))}
                                        />
                                    </form>
                                    <button onClick={this.handleSubmit} className="login">Send</button>
                                </div>
                            </div>

                            <div className="password-left flex">
                                <div className={'pass-contect'}>
                                    <h1>Reset Password</h1>
                                    <img src={Rectangle2} alt={''} width={"85px"} height={"85px"}/>
                                </div>
                                <img className="box2" alt={''} src={Rectangle3}/>
                            </div>
                        </div>
                </div>
            </Layout>
        );
    }
}

export default compose(graphql(forgetPassword),withAlert())(ResetPassword);