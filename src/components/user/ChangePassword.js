import React, { useState} from 'react';
import {Button} from "semantic-ui-react";
import "../../assets/scss/change-password.css"
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import {newPassword} from "../../queries/queries";
import logo from '../../assets/images/dappslab-logo.png'
import square from '../../assets/images/Rectangle2.png'
import rectangle from '../../assets/images/Rectangle3.png'

import "../../assets/scss/confirm_email.css"
import {useMutation} from "@apollo/client";
import {Client} from "../../queries/Services";
import {PasswordField} from "../ui/FormFields";


const ChangePassword =(props)=> {
    const [password,setPassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const [loading,setLoading]=useState(false)
    const alert=props.alert;

    const [changePassword]=useMutation(newPassword,{
        client:Client,onCompleted:data => {
            setLoading(false)
            if (data.resetPassword){
                alert.success("Password changed Successfully")
                props.history.push('/login')
            }else {
                alert.error(" Again request",{timeout:3000})
                props.history.push('/forget_password')
            }
        },onError:error => {
            setLoading(false)
            props.history.push('/forget_password')
            alert.error(error.toString()+" Again request",{timeout:3000})
        }
    })
    const isValid=()=>{
        if(password.length>4&&confirmPassword.length>4){
            if (password===confirmPassword){
                return true
            }else {
                alert.error("password not Match")
                return false
            }
        }else {
            alert.error("Password is too short",{timeout:3000})
            return false
        }
    }
    const onChnagePassword=(event)=>{
        event.preventDefault();
        if (password!==''&&confirmPassword!=='') {
            if (isValid()) {
                setLoading(true)
                changePassword({
                    variables: {
                        token: props.match.params.key,
                        password: password
                    }
                }).catch(e => {
                    console.log(e.toString())
                })
            }
        }else {
            alert.error("All fields are required")
        }
    };
    return (
        <div className={"password_container"} style={{height:window.innerHeight}}>
            <div className={'change_password'}>
                <div className={"pass_top flex"}>
                    <img src={logo} alt={'logo'}/>
                    <img src={square} alt={'square'}/>
                </div>
               <h2>Reset Your Password</h2>
               {/*<p>*/}
               {/*    Need to reset your password? No problem  just enter new password*/}
               {/*    and click on below submit custom-button*/}
               {/*</p>*/}
                <form>
                    <PasswordField password={password} setPassword={setPassword} name={'Password'}/>
                    <PasswordField password={confirmPassword} setPassword={setconfirmPassword} name={'Confirm Password'}/>
                    <Button loading={loading} disabled={loading} fluid onClick={(event)=>onChnagePassword(event)}>Submit</Button>
                </form>
                <img className={'rectangle'} alt={'rectangle'} src={rectangle}/>
          </div>
       </div>
        // {loading&&<Spinner/>}
    );
}

export default compose(withAlert()) (ChangePassword);