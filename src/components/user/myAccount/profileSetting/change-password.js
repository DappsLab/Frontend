import React, { useState} from 'react';
import {Modal} from 'semantic-ui-react'
import FormInput from "../../../ui/form-input/form-input.component";
import CustomButton from "../../../ui/custom-button/custom-button.component";
import {useMutation} from "@apollo/client";
import {withAlert} from "react-alert";
import {updatePassword} from '../../../../queries/queries'
import {Client} from "../../../../queries/Services";
import {Spinner3} from "../../../ui/Spinner";

const ChangePassword =(props)=>{
    const [currentPassword,setcurrentPassword]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const [passOne,setpassOne]=useState(true)
    const [passTwo,setpassTwo]=useState(true)
    const [passThree,setpassThree]=useState(true)
    const {toggle,alert,setToggle}=props


    const [update]=useMutation(updatePassword,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onError:error => {
            setLoading(false)
             alert.error(error.toString(),{timeout:2000})
        },onCompleted:data => {
            setLoading(false)
            if (data.changePassword){
                alert.success("Password changed successfully",{timeout:2000})
                setToggle(false)
            }else {
                alert.error("INVALID_RESPONSE",{timeout:2000})
            }
        }
    })
    const handleSubmit=(event)=>{
        event.preventDefault();
        if (confirmPassword.length>5&&password.length>5&&currentPassword.length>5){
            if (password===confirmPassword){
                setLoading(true)
                update({
                    variables:{
                        pass:currentPassword,
                        newPass:password
                    }
                }).catch(err=>{
                    console.log(err.toString())
                })
            }else {
                alert.error("Confirm Password not match")
            }
        }else {
            alert.error("Password is too short")
        }
    }
    return (
        <Modal className={'pass-model-dimmer'} open={toggle} onClose={() => setToggle(false)}>
            {loading ? <Spinner3/> :
                <div className={'change-pass-modal'}>
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type={passOne?'password':'text'} password hidden={passOne}
                            name={'currentPassword'} label={'Current Password'}
                            handleChange={(event) => setcurrentPassword(event.target.value)}
                            value={currentPassword} required
                            onHidden={()=>setpassOne(!passOne)}
                        />
                        <FormInput
                            type={passTwo?'password':'text'} password hidden={passTwo}
                            name={'password'} label={'New Password'}
                            handleChange={(event) => setPassword(event.target.value)}
                            value={password} required onHidden={()=>setpassTwo(!passTwo)}
                        />
                        <FormInput
                            type={passThree?'password':'text'} password hidden={passThree}
                            name={'confirmPassword'} label={'Confirm Password'}
                            handleChange={(event) => setconfirmPassword(event.target.value)}
                            required value={confirmPassword} onHidden={()=>setpassThree(!passThree)}
                        />
                        <div className={'flex buttons'}>
                            <CustomButton onClick={() => setToggle(false)} cancel>Cancel</CustomButton>
                            <CustomButton type={'submit'}>Change password</CustomButton>
                        </div>
                    </form>
                </div>
            }
        </Modal>
    );
};

// const mapStateToProps=({toggle:{hidden}})=>({
//     hidden
// //    hidden:state.toggle.hidden
// //    ({toggle})
// })
// const mapDispatchToProps=dispatch=>({
//     toggleHidden:()=>dispatch(toggleHidden())
// })
// connect(mapStateToProps,mapDispatchToProps)
export default withAlert()  (ChangePassword);
