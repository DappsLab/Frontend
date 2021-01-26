import React, {Component} from 'react';
import {toggleHidden} from "../../../../reducer/toggle/toggle.actions";
import {connect} from "react-redux";
import {Modal} from 'semantic-ui-react'
import FormInput from "../../../ui/form-input/form-input.component";
import CustomButton from "../../../ui/custom-button/custom-button.component";


class ChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state={
            currentPassword:'',
            password:'',
            confirmPassword:'',
        }
    }
    handleChange=event=>{
        const {value,name}=event.target;
        this.setState({[name]:value})
    }
    handleSubmi=()=>{
        
    }
    render() {
        const {password,currentPassword,confirmPassword}=this.state
        const {toggle,setToggle}=this.props
        return (
            <Modal open={toggle} onClose={() => setToggle(false)}>
                <div className={'change-pass-modal'}>
                    <h2>Change Password</h2>
                    <form>
                        <FormInput
                            type={'password'}
                            name={'currentPassword'} label={'Current Password'}
                            handleChange={this.handleChange} value={currentPassword} required
                        />
                        <FormInput
                            type={'password'}
                            name={'password'} label={'New Password'}
                            handleChange={this.handleChange} value={password} required
                        />
                        <FormInput
                            type={'password'}
                            name={'confirmPassword'} label={'Confirm Password'}
                            handleChange={this.handleChange} value={confirmPassword} required
                        />
                        <div className={'flex buttons'}>
                            <CustomButton onClick={()=>setToggle(false)} cancel>Cancel</CustomButton>
                            <CustomButton onCLick={()=>this.handleSubmit}>Change password</CustomButton>
                        </div>
                    </form>
                </div>
                {/*<Modal.Header>Change Password</Modal.Header>*/}
                {/*<Modal.Actions>*/}
                {/*    <Button  onClick={() => setToggle(false)}>*/}
                {/*        Cancel*/}
                {/*    </Button>*/}
                {/*    <Button onClick={() => setToggle(false)}>Change </Button>*/}
                {/*</Modal.Actions>*/}
            </Modal>
        );
    }
};

const mapStateToProps=({toggle:{hidden}})=>({
    hidden
//    hidden:state.toggle.hidden
//    ({toggle})
})
const mapDispatchToProps=dispatch=>({
    toggleHidden:()=>dispatch(toggleHidden())
})
export default connect(mapStateToProps,mapDispatchToProps) (ChangePassword);
