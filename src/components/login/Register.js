import React, {Component} from 'react';
import {LoginTop,isFormValid} from "../ui/mise";
import "../../assets/scss/register.css"
import {Grid, Form, Segment, Button} from 'semantic-ui-react';
import Checkbox from "@material-ui/core/Checkbox";
import Layout from "../../hoc/Layout";
import {graphql} from "react-apollo";
import {flowRight as compose} from 'lodash';
import {createNewUser} from '../../queries/queries'
import { withAlert } from 'react-alert'
import Spinner from "../ui/Spinner";

const usernameRegex=RegExp(/^[a-zA-Z0-9]*$/);
const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
class Register extends Component {
    state = {
        fullName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        username:"",
        error:false,
        loading:false,
        errorMessage:"",
        checkBox:"",
        formErrors:{
            fullName: "",
            email: "",
            password: "",
            username:"",
            passwordConfirmation:"",
            check1:"",
            check2:"",
            check3:""

        }
    };
    handleChange = event => {
        const {name,value}=event.target;
        let formErrors=this.state.formErrors;
        const {password,passwordConfirmation}=this.state;
        switch (name){
            case 'fullName':
                formErrors.fullName= alphabetRegex.test(value)
                    ? ""
                    :"Only Alphabet Allowed";
                break;
            case 'username':
                if(usernameRegex.test(value)){
                    formErrors.username="";
                }else {
                    formErrors.username="Only Alphabet and Integer Allowed";
                }
                break;
            case 'email':
                if (emailRegex.test(value)){
                    formErrors.email="";

                }else{
                formErrors.email="Invalid email address";
                }
                break;
            case 'password':
                if (value.length<5){
                    formErrors.password="Minimum 5 characaters required";
                }else{
                    if (passwordConfirmation.length>0){
                        if (value!==this.state.passwordConfirmation) {
                            formErrors.password = "Password not match";
                        }  else {
                            formErrors.password="";
                            formErrors.passwordConfirmation="";
                        }
                    }
                    else {
                        formErrors.password="";
                    }
                }
                break;
            case 'passwordConfirmation':
                if (value.length<5){
                    formErrors.passwordConfirmation="Minimum 5 characaters required"
                }else {
                    if (password.length>0){
                        if (value!==this.state.password) {
                            formErrors.passwordConfirmation = "Password not match";
                        }  else {
                            formErrors.passwordConfirmation="";
                            formErrors.password="";
                        }
                    }
                     else {
                        formErrors.passwordConfirmation="";
                    }
                }
                break;
            default:
               break;
        }
        this.setState({formErrors,[name]:value},()=>{});
    };
    checkboxList=[
        {value:1,hint:"I agree with DappsLab term and condition"},
        {value:2,hint:"I agree with DappsLab Privacy Policy"},
        {value:3,hint:"I agree with DappsLab Subscription Agreement"}
    ]
    renderCheckBox=()=>(
        this.checkboxList.map(list=>(
            <div key={list.value}>
                <div  className={"flex"}>
                    <Checkbox
                        value={list.value}
                        onChange={this.onCheckboxChange.bind(this)}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <p>{list.hint}</p>
                </div>
            </div>
        ))
    );
    isValidCheckbox=(checkbox)=>{
        return checkbox.check1 === true && checkbox.check2 === true && checkbox.check3 === true;
    };
    handleSubmit = (event) => {
        const alert = this.props.alert;
        event.preventDefault();
        const that=this;
        if (this.isValidCheckbox(this.state.formErrors)) {
            if (isFormValid(this.state)) {
                this.setState({loading:true})
                const {fullName,email,username,password}=this.state;
                this.props.createNewUser({
                    variables:{
                        fullName: fullName.toString(),
                        userName: username.toString(),
                        email: email.toString(),
                        password: password.toString()
                    }
                }).then(()=>{
                    that.setState({loading:false})
                    alert.success("User Register Successfully. Email varifection send tou your provided Email ",{timeout: 15000})
                    this.props.history.push('/login')
                }).catch((error)=>{
                    that.setState({loading:false})
                    alert.error(error.message,{timeout: 5000})
                })

            } else {
                this.handleError(this.state);
            }
        }else {
            if (!isFormValid(this.state)) {
                this.handleError(this.state);
                this.setState({checkBox:"Check all Fileds"});
            }else {
                this.setState({checkBox:"Check all Fileds"});
            }
        }
    }
    handleError=(values)=>{
        let error=values.formErrors;
        console.log(error)
        if (values.fullName===""){error.fullName = "Required Field";}
        if (values.email===""){error.email = "Required Field";}
        if (values.username===""){error.username = "Required Field";}
        if (values.passwordConfirmation===""){error.passwordConfirmation = "Required Field";}
        if (values.password===""){error.password = "Required Field";}
        this.setState({formErrors: error});
    }
    onCheckboxChange=(event)=>{
        const {checked,value}=event.target;
        let formErrors=this.state.formErrors;
        switch (value){
            case '1':
                formErrors.check1=checked;
                break;
            case '2':
                formErrors.check2=checked;
                break;
            case '3':
                formErrors.check3=checked;
                break;
            default:
            break;
        }
        this.setState({formErrors},()=>{ });
    }
    render() {
        console.log(this.props)
        const { fullName,username, email, password, passwordConfirmation,checkBox,loading ,formErrors} = this.state;
        return  (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' className="register-bg">
                    <Grid.Column style={{maxWidth:700}}>
                        <Form   onSubmit={ this.handleSubmit}>
                            <Segment piled>
                            <LoginTop
                                heading={"Register"}  linkto={"/login"}
                                paragraph={"Create your new account"}
                                link={"Already have an account"}
                            />
                            <Form.Input
                                fluid value={fullName} name="fullName"
                                icon="user" iconPosition="left" type="text"
                                placeholder="Full Name" onChange={this.handleChange}
                                className={formErrors.fullName.length>0?"error":""}
                            />
                                {formErrors.fullName.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.fullName}</span>
                                )}
                            < Form.Input
                                fluid value={email}
                                name="email" icon="mail" iconPosition="left"
                                type="email" placeholder="Email" onChange={this.handleChange}
                                className={formErrors.email.length>0?"error":""}
                                />
                                {formErrors.email.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.email}</span>
                                )}
                                <Form.Input
                                    autoComplete="new-password"
                                    fluid value={username} name="username"
                                    icon="user" iconPosition="left" type="text"
                                    placeholder="Username" onChange={this.handleChange}
                                    className={formErrors.username.length>0?"error":""}
                                />
                                {formErrors.username.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.username}</span>
                                )}
                            <Form.Group widths={'equal'}>
                                < Form.Input
                                    fluid value={password}
                                    name="password" icon="lock" iconPosition="left"
                                    type="Password" placeholder="Password"
                                    onChange={this.handleChange}
                                    className={formErrors.password.length>0?"error":""}
                                />
                                < Form.Input
                                    fluid value={passwordConfirmation}
                                    name="passwordConfirmation" icon="repeat"
                                    iconPosition="left" type="Password"
                                    placeholder="Password confirmation"
                                    onChange={this.handleChange}
                                    className={formErrors.passwordConfirmation.length>0?"error":""}
                                />
                            </Form.Group>
                                <div className={"flex errorBox"}>
                                    {formErrors.password.length>0&&(
                                        <span className={"errorMessage"}>{formErrors.password}</span>
                                    )}
                                    {formErrors.passwordConfirmation.length>0&&(
                                        <span className={"errorMessage"}>{formErrors.passwordConfirmation}</span>
                                    )}
                                </div>
                            <div className={"checkboxs"}>
                                {this.renderCheckBox()}
                                {formErrors.check1&&formErrors.check2&&formErrors.check3?
                                   ""
                                    : <span className={"errorMessage"}>{checkBox}</span>
                                }
                            </div>
                            <Button
                                disabled={!(formErrors.fullName.length === 0 && formErrors.email.length === 0 && formErrors.password.length === 0 && formErrors.passwordConfirmation.length === 0)}
                                fluid size="large">Register</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                {loading &&<Spinner/>}
            </Layout>
        );
    }
}


export default compose(
    graphql(createNewUser,{name:"createNewUser"}),
    withAlert()
)(Register);
