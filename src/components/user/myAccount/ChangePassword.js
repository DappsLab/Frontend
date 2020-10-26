import React, {Component} from 'react';
import {Button, Form, Icon, Modal} from "semantic-ui-react";

class ChangePassword extends Component {
    state={
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
        formErrors:{
            currentPassword:"",
            newPassword:"",
            confirmPassword:"",
        }
    }
    sendData=()=>{
        const {passwordData,closeModel}=this.props;
        const {confirmPassword,currentPassword,formErrors,newPassword}=this.state
        if (currentPassword!==""&&newPassword!==""&&confirmPassword!=="") {
            if (formErrors.currentPassword===""&&formErrors.confirmPassword===""&&formErrors.newPassword==="") {
                passwordData(currentPassword, newPassword);
                closeModel();
                this.setState({currentPassword: "", newPassword: "", confirmPassword: ""})
            }
        }else {
            const formErrors=this.state.formErrors;
            if (currentPassword==="") formErrors.currentPassword="Field Required";
            if (newPassword==="") formErrors.newPassword="Field Required";
            if (confirmPassword==="") formErrors.confirmPassword="Field Required";
            this.setState({formErrors})
        }
    };
    handleChange=(event)=>{
        const {name,value}=event.target;
        let formErrors=this.state.formErrors;
        const {newPassword,confirmPassword}=this.state;
        switch (name){
            case 'currentPassword':
               if (value.length<5){
                   formErrors.currentPassword="Minimum 5 characaters required";
               }else {
                  formErrors.currentPassword="";
               }
                break;
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
        const {model,closeModel}=this.props;
        const {formErrors,currentPassword,newPassword,confirmPassword}=this.state;
        return (
            <Modal  open={model} onClose={closeModel}>
                <Modal.Header>Chnage Passowrd</Modal.Header>
                <Modal.Content className={"passwordModel"}>
                    <Form.Field className={"flex"}>
                        <label>Current Password</label>
                        <Form.Input
                            type={"password"} value={currentPassword}
                            name="currentPassword" onChange={this.handleChange}/>
                    </Form.Field>
                    {formErrors.currentPassword.length>0&&(
                        <span className={"flex errorMessage"}>{formErrors.currentPassword}</span>
                    )}
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
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={this.sendData}
                        color={"green"}
                        inverted
                    >
                        <Icon name={"checkmark"}/>OK
                    </Button>
                    <Button
                        color={"red"}
                        inverted
                        onClick={closeModel}
                    >
                        <Icon name={"remove"}/>Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ChangePassword;