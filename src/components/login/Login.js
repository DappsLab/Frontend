import React, {Component} from 'react';
import '../../assets/scss/login.css'
import {Link} from "react-router-dom";
import {Grid, Form, Segment, Button, Message} from 'semantic-ui-react';
import {LoginTop} from "../ui/mise";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";
import Layout from "../../hoc/Layout";
import {graphql } from "react-apollo";
import { loginUser} from '../../queries/queries';

const usernameRegex=RegExp(/^[a-zA-Z0-9]*$/);
class Login extends Component {
    state={
        userName: "",
        password: "",
        error:false,
        formErrors: {
            userName: "",
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
            case 'userName':
                formErrors.userName = usernameRegex.test(value)
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
            this.setState({ errors: [] });
            const {userName,password}=this.state;
            this.props.loginUser({
                variables:{
                    userName: userName.toString(),
                    password: password.toString()
                }
            });
            // console.log(this.props);
            // for (let i = 0; i < Users.length; i++) {
            //     if (Users[i]['userName'] === this.state.userName ) {
            //         if (Users[i]['password'] === this.state.password) {
            //             this.props.setUser();
            //             this.props.history.push('/')
            //         }else {
            //             console.log("password not match")
            //             console.log(Users[i]['password']);
            //             console.log(this.state.password);
            //             let formErrors=this.state.formErrors;
            //             formErrors.password="password not match";
            //             this.setState({error:false,formErrors});
            //         }
            //     }else {
            //        this.setState({error:true});
            //     }
            // }
        }
    };
    isFormValid = ({ userName, password }) =>{
        if (userName.length!==0&&password.label!==0){
            return true;
        }else {
            let error = this.state.formErrors;
            if (userName === "") {error.userName = "Field Required";}
            if (password === "") {error.password = "Field Required";}
            this.setState({formErrors: error});
            return false;
        }
    }

    render() {
        console.log(this.props.loginUser);
        const {  userName, password,formErrors ,error} = this.state;
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
                                    icon="user" iconPosition="left" value={userName}
                                    name="userName" type="text"
                                    placeholder="Usename" onChange={this.handleChange}
                                    className={formErrors.userName.length>0?"error":""}
                                />
                                {formErrors.userName.length>0&&(
                                    <span className={"errorMessage"}>{formErrors.userName}</span>
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
                        {error && (
                            <Message error>
                                <h3>User not found </h3>
                            </Message>
                        )}
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
    _confirm
}
// , {
//     options: () => {
//         return {
//             variables: {
//                 userName: "name23",
//                 password: "Qasim12!"
//             }
//         }
//     }
// }

const LoginComponent= graphql(loginUser,{name:"loginUser"})(Login)
export default  connect(null, {setUser})(LoginComponent);
