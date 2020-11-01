import React, {Component} from 'react';
import {Grid, Form, Segment} from "semantic-ui-react";
import "../../assets/scss/change-password.css"
import {Button} from "@material-ui/core";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";
import {newPassword} from "../../queries/queries";


class ChangePassword extends Component {
    state={
        newPassword:"",
        confirmPassword:"",
        token:"",
        loading:false,
        formErrors:{
            newPassword:"",
            confirmPassword:"",
        }
    }
    sendData=()=>{
        const {confirmPassword,formErrors,token,newPassword}=this.state
        if (newPassword!==""&&confirmPassword!=="") {
            if (formErrors.newPassword===""&&formErrors.confirmPassword===""&&formErrors.newPassword==="") {
                this.props.mutate({
                    variables:{
                        token:token,
                        password:newPassword
                    }
                })
                console.log(this.props)
            }
        }else {
            const formErrors=this.state.formErrors;
            if (newPassword==="") formErrors.newPassword="Field Required";
            if (confirmPassword==="") formErrors.confirmPassword="Field Required";
            this.setState({formErrors})
        }
    };
    componentDidMount() {
        const token=this.props.match.params.key;
        this.setState({token:token},()=>console.log(this.state))
    }

    handleChange=(event)=>{
        const {name,value}=event.target;
        let formErrors=this.state.formErrors;
        const {newPassword,confirmPassword}=this.state;
        switch (name){
            case 'newPassword':
                if (value.length<5){
                    formErrors.newPassword="Minimum 5 characaters required";
                }else{
                    if (confirmPassword.length>0){
                        if (value!==confirmPassword) {
                            formErrors.newPassword = "Password not match";
                        }  else {
                            formErrors.newPassword="";
                            formErrors.confirmPassword="";
                        }
                    }
                    else {
                        formErrors.newPassword="";
                    }
                }
                break;
            case 'confirmPassword':
                if (value.length<5){
                    formErrors.confirmPassword="Minimum 5 characaters required"
                }else {
                    if (newPassword.length>0){
                        if (value!==newPassword) {
                            formErrors.confirmPassword = "Password not match";
                        }  else {
                            formErrors.confirmPassword="";
                            formErrors.newPassword="";
                        }
                    }
                    else {
                        formErrors.confirmPassword="";
                    }
                }
                break;
            default:
                break;
        }
        this.setState({[name]:value},()=>{});
    }
    render() {
        const {formErrors,newPassword,confirmPassword}=this.state;
        return (
           <Grid textAlign="center" className={"passwordChange"}  verticalAlign='middle'>
               <Grid.Column style={{maxWidth:600}}>
                   <Segment>
                       <Form>
                            <Form.Field className={"flex"}>
                                <label>New Password</label>
                                <Form.Input
                                    type={"password"} value={newPassword}
                                    name="newPassword" onChange={this.handleChange}/>
                            </Form.Field>
                            {formErrors.newPassword.length>0&&(
                                <span className={"flex errorMessage"}>{formErrors.newPassword}</span>
                            )}
                            <Form.Field className={"flex"}>
                                <label>Confirm Password</label>
                                <Form.Input
                                    type={"password"} value={confirmPassword}
                                    name="confirmPassword" onChange={this.handleChange}/>
                            </Form.Field>
                            {formErrors.confirmPassword.length>0&&(
                                <span className={"flex errorMessage"}>{formErrors.confirmPassword}</span>
                            )}
                            <Button onClick={this.sendData}>Submit</Button>
                       </Form>
                   </Segment>
               </Grid.Column>
           </Grid>
        );
    }
}

export default compose(graphql(newPassword)) (ChangePassword);