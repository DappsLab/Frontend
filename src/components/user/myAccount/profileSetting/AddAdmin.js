import React, {useState} from 'react';
import {withAlert} from "react-alert";
import {Spinner3} from "../../../ui/Spinner";
import FormInput from "../../../ui/form-input/form-input.component";
import CustomButton from "../../../ui/custom-button/custom-button.component";
import {Modal} from "semantic-ui-react";
import {emailRegex} from "../../../ui/Helpers";

const AddAdmin = (props) => {
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState('')
    const {toggle,alert,setToggle}=props

    const handleSubmit=(event)=>{
        event.preventDefault();
        if (emailRegex.test(email)){
                setLoading(true)
                // update({
                //     variables:{
                //         email:email
                //     }
                // }).catch(err=>{
                //     console.log(err.toString())
                // })
        }else {
            alert.error("Invalid Email")
        }
    }
    return (
        <Modal className={'pass-model-dimmer'} open={toggle} onClose={() => setToggle(false)}>
            {loading ? <Spinner3/> :
                <div className={'change-pass-modal'}>
                    <h2>Assign New Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type={'email'} name={'email'} label={'Email of New Admin'}
                            handleChange={(event) => setEmail(event.target.value)}
                            value={email} required
                        />

                        <div className={'flex buttons'}>
                            <CustomButton onClick={() => setToggle(false)} cancel>Cancel</CustomButton>
                            <CustomButton type={'submit'}>Send Email</CustomButton>
                        </div>
                    </form>
                </div>
            }
        </Modal>
    );
};

export default withAlert() (AddAdmin);
