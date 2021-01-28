import React, { useState} from 'react';
import '../../assets/scss/login.css'
import {Link} from "react-router-dom";
import Layout from "../../hoc/Layout";
import { withAlert} from "react-alert";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../reducer/user/user.actions";
import {client, login, me_Query} from "../../queries/queries";
import {Spinner2} from "../ui/Spinner";
import logo from '../../assets/images/logo_dapps.png'
import bar1 from '../../assets/images/bar1.png';
import Rectangle2 from '../../assets/images/Rectangle2.png'
import Rectangle3 from '../../assets/images/Rectangle3.png'
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CustomButton from "../ui/custom-button/custom-button.component";


const Login =(props)=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [showPassword,setshowPassword]=useState(false)
    const [loading,setLoading]=useState(false);
    const alert = props.alert;
    const isFormValid = () => {
        if (username.length !== 0 && password.label !== 0) {
            return true;
        } else {
            alert.error("All Fields Required",{timeout:2000})
            return false;
        }
    }
    const HandleSubmit = async (event) => {
        event.preventDefault();
        setUsername('');
        setPassword('');
        if (isFormValid()) {
            setLoading(true);
            const results = await client.query({
                query: login,
                variables: {username: username, password: password},
            }).catch(error => {
                alert.error(error.toString()+" Try Again", {timeout: 5000})
            });
            if (results){
                const logged=results.data.loginUser
                const user=await client.query({
                    query:me_Query,
                    context:{
                        headers:{
                            authorization:logged.token
                        }
                    }
                }).catch(error=>{
                    alert.error(error.toString()+" Try Again", {timeout: 5000})
                });
                if (user){
                    setLoading(false);
                    // if (user.data.me.isBlocked){
                    //     console.log("user",user)
                    // }else {
                        if (user.data.me.twoFactorEnabled) {
                            props.history.push(`/2FA_varifivcation/${logged.token}`);
                        } else {
                            localStorage.setItem("token", logged.token);
                            props.setUser(user.data.me);
                            alert.success("Login Successfully", {timeout: 5000});
                            props.history.push('/');
                        }
                    // }
                }
            }
            setLoading(false);
        }
    };

    return  (
        <Layout>
            <div className="register-wrapper">
                {loading&&<Spinner2/>}
                <div className="login-wrapper">
                    <div className="loginRight">
                        <div className="top">
                            <div className="logo">
                                <img src={logo} alt={"img"}/>
                            </div>
                            <div className="btn">
                                <Link to={'/register'} className="signup">SignUp</Link>
                            </div>
                        </div>
                        <div className="form">
                            <h2>Login</h2>
                            <img className="bar1" src={bar1} alt={'bar'}/><br/>
                            <form autoComplete={'off'} onSubmit={HandleSubmit} noValidate>
                                <FormControl className={'uname'} >
                                    <InputLabel>Username</InputLabel>
                                    <Input
                                        type={ 'text'}
                                        value={username} autoComplete={'off'}
                                        onChange={(event)=>setUsername(event.target.value)}
                                        name={'username'}
                                    />
                                </FormControl>
                                <br/>
                                <FormControl className={'uname'} >
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password} name={'password'} autoComplete={'off'}
                                        onChange={(event)=>setPassword(event.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{setshowPassword(!showPassword)}}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <p className="fgtpwd"><Link to={'/forget_password'}>forget password </Link></p>
                                <CustomButton login type={'submit'}>Login</CustomButton>
                            </form>

                        </div>
                    </div>
                    <div className="loginleft flex password-left">
                        <div className={'pass-contect'}>
                            <h1>Welcome back to Dappslab</h1>
                            <img src={Rectangle2} alt={''} width={"85px"} height={"85px"}/>
                        </div>
                        <p>Login to continue to your account</p>
                        <img className="box2" src={Rectangle3} alt={'img'}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default  compose(
    connect(null, {setUser}),
    withAlert(),
) (Login);
