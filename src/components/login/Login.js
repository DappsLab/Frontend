import React, {Component} from 'react';
import '../../assets/scss/login.css'
import {Link} from "react-router-dom";
import {Grid, Form, Segment, Button} from 'semantic-ui-react';
import {LoginTop} from "../ui/mise";
import Layout from "../../hoc/Layout";
import LoginQuery from "../../queries/LoginQuery";
import UserQuery from "../../queries/UserQuery";
import { withAlert} from "react-alert";


const usernameRegex=RegExp(/^[a-zA-Z0-9]*$/);
class Login extends Component {
    constructor(props) {
        super(props);
    }
    state={
        username: "",
        loginQuery:false,
        userQuery:false,
        loginError:"",
        error:"",
        id:"",
        errorHide:false,
        password: "",
        formErrors: {
            username: "",
            password: "",
        }
    }
    handleChange = event => {
        const {name,value}=event.target;
        let formErrors=this.state.formErrors;
        switch (name) {
            case 'password':
                formErrors.password =value.length<5 &&value.length>0
                    ? "Password too Short"
                    : "";
                break;
            case 'username':
                formErrors.username = usernameRegex.test(value)
                    ? ""
                    : "Only Alphabet and Integer Allowed";
                break;
            default:
                break;
        }
        this.setState({formErrors,[name]:value},()=>{});
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({loginQuery:true,errorHide:false});
        }
    };
    isFormValid = ({ username, password }) =>{
        if (username.length!==0&&password.label!==0){
            return true;
        }else {
            let error = this.state.formErrors;
            if (username === "") {error.username = "Field Required";}
            if (password === "") {error.password = "Field Required";}
            return false;
        }
    }
    closeLoginQuery=()=>{
        this.setState({loginQuery:false})
    }
    closeUserQuery=()=>{
        this.setState({userQuery:false})
    }
    getUserInfo=(data)=>{
       if ( data.toLowerCase().includes("error")){
           data=data.replace('GraphQL','')
           const alert = this.props.alert;
           alert.error(data, {timeout: 5000});
       }else {
           this.setState({id:data,userQuery:true});
       }
    }
    getUserData=(data)=>{
        if (data==="user"){
            const alert = this.props.alert;
            alert.success("Login Successfully", {timeout: 5000});
            this.props.history.push('/');
        }
    }
    render() {
        const {username,password,formErrors,userQuery,id,loginQuery,errorHide} = this.state;
        return (
            <Layout>

                <Grid textAlign="center"  verticalAlign='middle' className="login-bg">
                    <Grid.Column style={{maxWidth:700}}>
                        <Form  onSubmit={this.handleSubmit}>
                            <Segment piled>
                                <LoginTop
                                    heading={"Login"}
                                    paragraph={"Account login"}
                                    link={"Don't have an account"}
                                    linkto={"/register"}
                                />
                                <Form.Input
                                    icon="user"  iconPosition="left" value={username}
                                    name="username" type="text"
                                    placeholder="Username" onChange={this.handleChange}
                                    className={formErrors.username.length>0?"error":""}
                                />
                                {formErrors.username.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.username}</span>
                                )}
                                <Form.Input
                                    icon="lock" iconPosition="left" value={password}
                                    name="password" type="password"
                                    placeholder="Password" onChange={this.handleChange}
                                    className={formErrors.password.length>0?"error":""}
                                />
                                {formErrors.password.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.password}</span>
                                )}
                                <Button fluid size="large">Login</Button>
                                <p> <Link to={"/forget_password"}>Click here</Link> if you forget your password</p>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                {loginQuery&&
                    <LoginQuery
                        username={username}
                        password={password}
                        close={this.closeLoginQuery}
                        getUserInfo={this.getUserInfo}
                    />
                }
                {userQuery&&
                    <UserQuery
                        id={id}
                        close={this.closeUserQuery}
                        getUserData={this.getUserData}
                    />
                }

            </Layout>
        );
    }
}
export default withAlert()(Login);
