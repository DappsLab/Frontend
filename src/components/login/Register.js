import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper";
import {LoginTop, Validation} from "../ui/mise";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser } from '@fortawesome/free-solid-svg-icons'
import "../../assets/scss/register.css"
import {IconInput} from "../ui/FormFields";
import {Lock, MailOutline} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Layout from "../../hoc/Layout";


class Register extends Component {
    state={
        box1:null,
        logged:true,
        formData:{
            username:{
                element:'input',
                value:'',
                config:{
                    name:'full_name',
                    type:'text',
                    placeholder:'Full Name'
                },
                validation:{
                    name:true,
                    required:true,
                    email:false
                },
                showLabel:false,
                valid:false,
                validationMessage:''
            },
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
                    email:false
                },
                showLabel:false,
                valid:false,
                validationMessage:''
            },
            re_password: {
                element: 'input',
                value: '',
                config: {
                    name: 'tags',
                    type: 'password',
                    placeholder:'Confirm Password'
                },
                validation: {
                    required:true,
                    email:false
                },
                showLabel:false,
                valid:false,
                validationMessage:''
            }
        }
    }
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
                {this.state.box1===false&&list.value===1?
                    <span>it should be checked</span>
                    :
                    null

                }
            </div>
        ))
    )
    submitForm=(event)=> {
        if (this.state.box1) {
            event.preventDefault();
            let dataToSubmit = {};
            let formIsValid = true;
            for (let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value;
                formIsValid = this.state.formData[key].valid && formIsValid;
            }
            if (formIsValid) {
                this.setState({logged: true})
                this.props.history.push('/login', this.state.logged)
            }
        }else {
           this.setState({box1:false})
        }
    }
    updateForm=(element)=>{
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        newElement.valid = validationData[0];
        newElement.validationMessage= validationData[1];
        console.log(newElement.valid)
        newFormData[element.id] = newElement;
        this.setState({
            formError:false,
            formData:newFormData
        })
    }
    onCheckboxChange=(event)=>{
        if (event.target.value===1){
            this.setState({box1:event.target.checked})
        }
        console.log(event.target.value)
    }
    render() {
        return (
            <Layout>
                <div className={"login-bg fullWidth flex"}>
                    <Paper elevation={3} className={"login_wrapper register_wrapper"}>
                        <form  onSubmit={(event)=> this.submitForm(event)}>
                            <LoginTop
                                heading={"Register"}
                                paragraph={"Create your new account"}
                                link={"Already have an account"}
                                linkto={"/login"}
                            />
                            <IconInput
                                icon={<FontAwesomeIcon icon={faUser}/>}
                                id={'username'}
                                formData={this.state.formData.username}
                                change={(element)=> this.updateForm(element)}
                            />
                            <IconInput
                                icon={<MailOutline/>}
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element)=> this.updateForm(element)}
                            />
                            <div className={"register_pass flex"}>
                                <IconInput
                                    icon={<Lock/>}
                                    id={'password'}
                                    formData={this.state.formData.password}
                                    change={(element)=> this.updateForm(element)}
                                />
                                <IconInput
                                    icon={<Lock/>}
                                    id={'re_password'}
                                    formData={this.state.formData.re_password}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>
                            <div className={"checkboxs"}>
                                {this.renderCheckBox()}
                            </div>
                            <Button onClick={(event)=> this.submitForm(event)}>Register</Button>
                        </form>
                    </Paper>
                </div>
            </Layout>
        );
    }
}

export default Register;
