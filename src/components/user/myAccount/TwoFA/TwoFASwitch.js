import React from 'react';
import { useMutation} from "@apollo/client";
import {disable2FA, enableFA, me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import Switch from "@material-ui/core/Switch";
import {withAlert} from "react-alert";
import {flowRight as compose} from "lodash";

const MyComponent = (props) => {
    const {alert,user}=props
    const context= {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const [disable]=useMutation(disable2FA,{
        client:Client,context:context,
        onCompleted:data => {
            if (data) {
                alert.success("Disable Successfully", {timeout: 3000})
                // props.history.push('/account_settings/2fa')
            }
        },
        onError:error => {
            alert.error(error.toString(), {timeout: 3000})
        },refetchQueries:[{query:me_Query,context: { headers: {
                    authorization: localStorage.getItem("token")
                }}
        }],
    })
    const [enable]=useMutation(enableFA,{
        client:Client,context:context,
        onCompleted:data => {
            alert.success("Enable Successfully",{timeout:3000})
            // props.history.push('/account_settings/2fa')
        },refetchQueries:[{query:me_Query,context: { headers: {
                    authorization: localStorage.getItem("token")
                }}
        }],
        onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const handleChange=(event)=>{
        event.preventDefault();

        const value=event.target.checked;
        props.setLoader(event.target.checked)
        if (value){
            enable().catch(error=>{
                console.log(error.toString())
            });
        }else {
            disable().catch(error=>{
                console.log(error.toString())
            })
        }

    }
    return (
        <div>
            <label>Enable your Two-Factor Authentication</label>
            <Switch
                checked={user.twoFactorEnabled}
                onClick={(event) => handleChange(event)}
                name="enableCheck"
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
            {user.twoFactorEnabled && <div className={" QR"}>
                <h3>Scan QR</h3>
                <img src={user.twoFactorCode} alt={""}/>
                <p>Open the Google Authenticator app and scan this QR code</p>
            </div>
            }
        </div>
    );
}

export default    compose(
    withAlert())
(MyComponent);
