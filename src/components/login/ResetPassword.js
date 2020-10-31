import React, {Component} from 'react';
import { Grid, Form, Message,Segment,Header,Icon, Button } from 'semantic-ui-react';
import Layout from "../../hoc/Layout";
import {forgetPassword, getUsersData} from '../../queries/queries'
import {graphql} from "react-apollo";
import Spinner from "../ui/Spinner";

const emailRegex=RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
class ResetPassword extends Component {
    state = {
        email: "",
        error: "",
        exist:false,
    }
    handleChange = event => {
        const {name,value}=event.target;
        if (emailRegex.test(value)) {
            this.setState({error:""});
        }
        else {
            this.setState({error:"Invalid email address"});
        }
        this.setState({[name]:value},()=>{});
    }
    handleSubmit=()=>{
        if (this.state.email!=="") {
            this.props.mutate({
                variables:{
                    email:this.state.email
                }
            })
            console.log(this.props)
        }else {
            this.setState({error:"Field Required"});
        }
    }
    render() {
        console.log(this.props);
        const {email,error}=this.state;
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' className="login-bg">
                    <Grid.Column style={{maxWidth:700}}>
                        <Header as="h1" icon color="violet" textAlign="center">
                            <Icon name="recycle" color="violet" />
                            Reset password
                        </Header>
                        <Form  onSubmit={this.handleSubmit}>
                            <Segment piled>
                                < Form.Input
                                    label={"Enter Email for Confermation"}
                                    labelPosition="left"
                                    fluid value={email}
                                    name="email" icon="mail" iconPosition="left"
                                    type="email" placeholder=" Email" onChange={this.handleChange}
                                    className={error>0?"error":""}
                                />
                                {error.length>0&&(
                                    <span className={"errorMessage"}>{error}</span>
                                )}
                                <Button fluid size="large">Reset</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default graphql(forgetPassword)(ResetPassword);