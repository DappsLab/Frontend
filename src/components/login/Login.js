import React, {Component} from 'react';
import '../../assets/scss/login.css'
import {Link} from "react-router-dom";
import {Grid, Form, Segment, Button} from 'semantic-ui-react';
import {LoginTop} from "../ui/mise";
import Layout from "../../hoc/Layout";
import { withAlert} from "react-alert";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";
import {client} from "../../queries/queries";
import {gql} from "@apollo/client";


const usernameRegex=RegExp(/^[a-zA-Z0-9]*$/);
class Login extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state={
        username: "",
        error:"",
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
        const {username,password}=this.state;
        const alert = this.props.alert;
        let that=this;
        if (this.isFormValid(this.state)) {
            this.setState({username: "",password: ""})
            client.query({
                query: gql`  query ($username:String!,$password:String!){
                    loginUser(userName: $username, password: $password) {
                        token
                        user {
                            id
                        }
                    }
                }`, variables: {username: username,password: password}
            }).then(result => {
              const  logged=result.data.loginUser;
              if (logged) {
                  client.query({
                      query: gql`   query ($id:ID!){
                          userById(id: $id) {
                              avatar address
                              fullName id type
                              kyc{
                                  kycStatus
                              }
                              email location userName twoFactorEnabled
                          }
                      }`, variables: {id: logged.user.id}
                  }).then(result => {
                      const user=result.data.userById;
                      if (user){
                          console.log(user.twoFactorEnabled)
                          if (user.twoFactorEnabled){
                              that.props.history.push(`/2FA_varifivcation/${logged.token}`);
                          }else {
                              localStorage.setItem("token",logged.token);
                              this.props.setUser(user);
                              alert.success("Login Successfully", {timeout: 5000});
                              if (user.type==="ADMIN"){
                                  this.props.history.push('/admin');
                              }else {
                                  this.props.history.push('/');
                              }
                          }
                      }
                  }).catch(r => {
                      const error=r.toString().replace('GraphQL','');
                      alert.error(error,{time:5000});
                      localStorage.removeItem("token");
                  });
              }
            }).catch(r => {
                const error=r.toString().replace('GraphQL','');
                alert.error(error,{time:5000})
            });
        }
    };
    isFormValid = ({ username, password }) =>{
        if (username.length!==0&&password.label!==0){
            return true;
        }else {
            let formErrors = this.state.formErrors;
            if (username === "") {formErrors.username = "Field Required";}
            if (password === "") {formErrors.password = "Field Required";}
            this.setState({formErrors})
            return false;
        }
    }
    render() {
        const {username,password,formErrors} = this.state;
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
            </Layout>
        );
    }
}
export default  compose(
    connect(null, {setUser}),withAlert(),
) (Login);
