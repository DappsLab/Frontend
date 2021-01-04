import React, { useState} from 'react';
import "../../assets/scss/register.css"
import Checkbox from "@material-ui/core/Checkbox";
import Layout from "../../hoc/Layout";
import {flowRight as compose} from 'lodash';
import {createNewUser} from '../../queries/queries'
import { withAlert } from 'react-alert'
import logo from '../../assets/images/logo_dapps.png'
import Rectangle2 from '../../assets/images/Rectangle2.png'
import Rectangle3 from '../../assets/images/Rectangle3.png'
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, TextField} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useMutation} from "@apollo/client";
import {Client} from "../../queries/Services";
import {Spinner2} from "../ui/Spinner";

const Register =(props)=> {

    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordConfirmation,setPasswordConfirmation]=useState('')
    const [username,setUsername]=useState('')
    const [check1,setCheck1]=useState('')
    const [check2,setCheck2]=useState('')
    const [check3,setCheck3]=useState('')
    const [showPass1,setshowPass1]=useState(false)
    const [showPass,setshowPass]=useState(false)
    const [loading,setLoading]=useState(false)
    const alert = props.alert;

    const checkboxList=[
        {value:1,hint:"I agree with DappsLab term and condition"},
        {value:2,hint:"I agree with DappsLab Privacy Policy"},
        {value:3,hint:"I agree with DappsLab Subscription Agreement"}
    ]
    const renderCheckBox=()=>(
        checkboxList.map(list=>(
            <div key={list.value}>
                <div  className={"flex"}>
                    <Checkbox
                        value={list.value}
                        onChange={event => onCheckboxChange(event)}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>{list.hint}</p>
                </div>
            </div>
        ))
    );
    const isFormValid=()=>{
        if (check1&&check2&&check3&&fullName!==""&&passwordConfirmation!==""&&username!==""&&email!==""&&password!==""){
            return true;
        }else {
            alert.error("All Fields are required")
            return false
        }
    }
    const isPassMatch=()=>{
        if (passwordConfirmation===password){
            return true;
        }else {
            alert.error("Password Not Match")
            return false
        }
    }
    const [createUser]=useMutation(createNewUser,{
        client:Client,
        onCompleted:data => {
            setLoading(false)
            alert.success("User Register Successfully. Email varifection send tou your provided Email ",{timeout: 15000})
            props.history.push('/login');
        },onError:error => {
            setLoading(false);
            alert.error(error.message,{timeout: 5000})
        }
    })
    const HandleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()&&isPassMatch()) {
            setLoading(true);
                createUser({
                    variables:{
                        fullName: fullName.toString(),
                        userName: username.toString(),
                        email: email.toString(),
                        password: password.toString()
                    }
                }).catch((error)=>{
                    alert.error(error.message,{timeout: 5000})
                })
        }
    }
    const onCheckboxChange=(event)=>{
        const {checked,value}=event.target;
        switch (value){
            case '1':
                setCheck1(checked)
                break;
            case '2':
                setCheck2(checked)
                break;
            case '3':
                setCheck3(checked)
                break;
            default:
            break;
        }
    }
    return  (
        <Layout>
            <div className="register-wrapper register">
                {loading&&<Spinner2/>}
                <div className="login-wrapper">
                    <div className="register-right">
                        <div className="top">
                            <div className="logo">
                                <img alt={''} src={logo}/>
                            </div>
                            <div className="btn">
                                <Link to={'/login'} className="signup">Login</Link>
                            </div>
                        </div>
                        <form className="form">
                            <h2>Sign Up</h2>
                            <TextField className={'fname'}
                                label="Full Name" value={fullName} type={'text'} name={'fullName'}
                                onChange={(event => setFullName(event.target.value))}
                            />
                           <div className={'flex user-email'}>
                               <TextField
                                   label="Username" value={username} type={'text'} name={'username'}
                                   onChange={(event => setUsername(event.target.value))}
                               />
                               <TextField
                                   label="Email" value={email} type={'email'} name={'email'}
                                   onChange={(event => setEmail(event.target.value))}
                               />
                           </div>
                            <div className={'pass flex'}>
                                <FormControl  >
                                    <InputLabel>Password</InputLabel>
                                    <Input
                                        type={showPass ? 'text' : 'password'}
                                        value={password} name={'password'} autoComplete={'off'}
                                        onChange={(event)=>setPassword(event.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{setshowPass(!showPass)}}
                                                >
                                                    {showPass ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                </FormControl>
                                <FormControl >
                                    <InputLabel >Password</InputLabel>
                                    <Input
                                        type={showPass1 ? 'text' : 'password'}
                                        value={passwordConfirmation} name={'passwordConfirmation'} autoComplete={'off'}
                                        onChange={(event)=>setPasswordConfirmation(event.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{setshowPass1(!showPass1)}}
                                                >
                                                    {showPass1 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className={"checkboxs"}>
                                {renderCheckBox()}
                            </div>
                            <button onClick={HandleSubmit} className="login strock">SignUp</button>
                            </form>
                        </div>

                        <div className="register-left flex password-left">
                            <div className={'pass-contect'}>
                                <h1>Welcome to Dappslab</h1>
                                <img src={Rectangle2} alt={''} width={"85px"} height={"85px"}/>
                            </div>
                            <p>Sign Up to continue to your account</p>
                            <img className="box2" alt={''} src={Rectangle3}/>
                        </div>
                    </div>
                </div>
                {/*<Grid textAlign="center"  verticalAlign='middle' className="register-bg">*/}
                {/*    <Grid.Column style={{maxWidth:700}}>*/}
                {/*        <Form   onSubmit={ this.handleSubmit}>*/}
                {/*            <Segment piled>*/}
                {/*            <LoginTop*/}
                {/*                heading={"Register"}  linkto={"/login"}*/}
                {/*                paragraph={"Create your new account"}*/}
                {/*                link={"Already have an account"}*/}
                {/*            />*/}
                {/*            <Form.Input*/}
                {/*                fluid value={fullName} name="fullName"*/}
                {/*                icon="user" iconPosition="left" type="text"*/}
                {/*                placeholder="Full Name" onChange={this.handleChange}*/}
                {/*                className={formErrors.fullName.length>0?"error":""}*/}
                {/*            />*/}
                {/*                {formErrors.fullName.length>0&&(*/}
                {/*                    <span className={"errorMessage"}>{formErrors.fullName}</span>*/}
                {/*                )}*/}
                {/*            < Form.Input*/}
                {/*                fluid value={email}*/}
                {/*                name="email" icon="mail" iconPosition="left"*/}
                {/*                type="email" placeholder="Email" onChange={this.handleChange}*/}
                {/*                className={formErrors.email.length>0?"error":""}*/}
                {/*                />*/}
                {/*                {formErrors.email.length>0&&(*/}
                {/*                    <span className={"errorMessage"}>{formErrors.email}</span>*/}
                {/*                )}*/}
                {/*                <Form.Input*/}
                {/*                    autoComplete="new-password"*/}
                {/*                    fluid value={username} name="username"*/}
                {/*                    icon="user" iconPosition="left" type="text"*/}
                {/*                    placeholder="Username" onChange={this.handleChange}*/}
                {/*                    className={formErrors.username.length>0?"error":""}*/}
                {/*                />*/}
                {/*                {formErrors.username.length>0&&(*/}
                {/*                    <span className={"errorMessage"}>{formErrors.username}</span>*/}
                {/*                )}*/}
                {/*            <Form.Group widths={'equal'}>*/}
                {/*                < Form.Input*/}
                {/*                    fluid value={password}*/}
                {/*                    name="password" icon="lock" iconPosition="left"*/}
                {/*                    type="Password" placeholder="Password"*/}
                {/*                    onChange={this.handleChange}*/}
                {/*                    className={formErrors.password.length>0?"error":""}*/}
                {/*                />*/}
                {/*                < Form.Input*/}
                {/*                    fluid value={passwordConfirmation}*/}
                {/*                    name="passwordConfirmation" icon="repeat"*/}
                {/*                    iconPosition="left" type="Password"*/}
                {/*                    placeholder="Password confirmation"*/}
                {/*                    onChange={this.handleChange}*/}
                {/*                    className={formErrors.passwordConfirmation.length>0?"error":""}*/}
                {/*                />*/}
                {/*            </Form.Group>*/}
                {/*                <div className={"flex errorBox"}>*/}
                {/*                    {formErrors.password.length>0&&(*/}
                {/*                        <span className={"errorMessage"}>{formErrors.password}</span>*/}
                {/*                    )}*/}
                {/*                    {formErrors.passwordConfirmation.length>0&&(*/}
                {/*                        <span className={"errorMessage"}>{formErrors.passwordConfirmation}</span>*/}
                {/*                    )}*/}
                {/*                </div>*/}
                {/*            <div className={"checkboxs"}>*/}
                {/*                {this.renderCheckBox()}*/}
                {/*                {formErrors.check1&&formErrors.check2&&formErrors.check3?*/}
                {/*                   ""*/}
                {/*                    : <span className={"errorMessage"}>{checkBox}</span>*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*            <Button*/}
                {/*                disabled={!(formErrors.fullName.length === 0 && formErrors.email.length === 0 && formErrors.password.length === 0 && formErrors.passwordConfirmation.length === 0)}*/}
                {/*                fluid size="large">Register</Button>*/}
                {/*            </Segment>*/}
                {/*        </Form>*/}
                {/*    </Grid.Column>*/}
                {/*</Grid>*/}
                {/*{loading &&<Spinner/>}*/}
            </Layout>
        );
}


export default compose(
    withAlert()
)(Register);
