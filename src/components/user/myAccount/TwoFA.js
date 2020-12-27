import React, { useState} from 'react';
import Switch from '@material-ui/core/Switch';
import {flowRight as compose} from "lodash";
import {disable2FA, enableFA, me_Query} from "../../../queries/queries";
import AccountLayout from "../../../hoc/AccountLayout";
import {withAlert} from "react-alert";
import {Client} from "../../../queries/Services";
import {useMutation} from "@apollo/client";
import {Spinner2} from "../../ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";

const TwoFA =(props)=> {
    const [loader,setLoader]=useState(false)
    const {alert,user,setUser}=props

    const context= {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const [disable]=useMutation(disable2FA,{
        client:Client,context:context,
        onCompleted:data => {
            console.log("disable")
            props.refetch()

            alert.success("Disable Successfully",{timeout:3000})
            setLoader(false)
        },
        onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const [enable]=useMutation(enableFA,{
        client:Client,context:context,
        onCompleted:data => {
            console.log("enable")
            props.refetch()

            alert.success("Enable Successfully",{timeout:3000})
            setLoader(false)
        },

        onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const handleChange=(event)=>{
        const value=event.target.checked;
        setLoader(true)
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


    const  RenderData= ()=> {
        // const {data, error, loading, refetch} = useQuery(me_Query, {
        //     client: Client, context: {
        //         headers: {
        //             authorization: localStorage.getItem("token")
        //         }
        //     }, fetchPolicy: 'network-only',
        //     onCompleted: data1 => {
        //         setUser(data1.me)
        //         setLoader(false)
        //     }
        // })
        // // if (loading) return <Spinner2/>
        if (loader) return <Spinner2/>
        // if (error) return <div>{error.toString()}</div>
        // if (data) {
        //     const user = data.me

            return (
                <div className={'two-fa'}>
                    <h1>Two-Factor Authentication</h1>
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
        // }
        //     return <div>Refresh</div>
    }
    return(
        <AccountLayout {...props}>
            {RenderData()}
        </AccountLayout>
    )
}

export default   compose(
    connect(null, {setUser}),
    withAlert()
)(TwoFA);
