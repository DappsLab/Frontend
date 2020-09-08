import React, {Component} from 'react';
import '../../assets/scss/login.css'
import {Link} from "react-router-dom";
import {IconInput} from "../ui/FormFields";
import Paper from "@material-ui/core/Paper";
import {Lock, MailOutline} from "@material-ui/icons";
import {Validation} from "../ui/mise";
import {Button} from "@material-ui/core";
import {LoginTop} from "../ui/mise";
import {connect} from "react-redux"
import {setUser} from "../../actions/Actions";
import Layout from "../../hoc/Layout";

class Login extends Component {
    state={
        logged:true,
        formData:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'search_input',
                    type:'email',
                    placeholder:'Email adderss'
                },
                validation:{
                    required:true,
                    email:true
                },
                showLabel:false,
                valid:false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'tags',
                    type: 'password',
                    placeholder:'Password'
                },
                validation: {
                    required:true,
                    email:true
                },
                showLabel:false,
                valid:false,
                validationMessage:''
            }
        }
    }
    submitForm=(event)=> {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            // formIsValid = this.state.formData[key].valid && formIsValid;
        }
        if (formIsValid) {
            this.props.setUser(dataToSubmit)
            console.log(dataToSubmit)
            this.props.history.push('/')
        }
    }
    updateForm=(element)=>{
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        newElement.valid = validationData[0];
        newElement.validationMessage= validationData[1];


        newFormData[element.id] = newElement;
        this.setState({
            formError:false,
            formData:newFormData
        })
    }
    render() {
        return (
            <Layout>
                <div className={"login-bg fullWidth flex"}>
                    <Paper elevation={3}  className={"login_wrapper"}>
                        <form  onSubmit={(event)=> this.submitForm(event)}>
                            <LoginTop
                                heading={"Login"}
                                paragraph={"Account login"}
                                link={"Don't have an account"}
                                linkto={"/register"}
                            />
                            <IconInput
                                icon={<MailOutline/>}
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element)=> this.updateForm(element)}
                            />
                            <IconInput
                                icon={<Lock/>}
                                id={'password'}
                                formData={this.state.formData.password}
                                change={(element)=> this.updateForm(element)}
                            />
                            <Button onClick={(event)=> this.submitForm(event)}>Login</Button>
                           <p className={"forget_password"}> <Link to={"/forget_password"}>Click here</Link> if you forget your password</p>
                        </form>
                    </Paper>
                </div>
            </Layout>
        );
    }
}

export default  connect(null, {setUser})(Login);
