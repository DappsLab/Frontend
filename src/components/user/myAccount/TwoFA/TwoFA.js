import React, { useState} from 'react';
import {flowRight as compose} from "lodash";
import AccountLayout from "../../../../hoc/AccountLayout";
import {withAlert} from "react-alert";
import {Spinner2} from "../../../ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../../../../actions/Actions";
import TwoFASwitch from "./TwoFASwitch";

const TwoFA =(props)=> {
    const [loader,setLoader]=useState(null)
    const {user}=props
    const  RenderData= ()=> {
        // const {data, error, loading,refetch} = useQuery(me_Query, {
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
        if (loader!==null&&user.twoFactorEnabled!==loader) return <Spinner2/>

        // if (error) return <div>{error.toString()}</div>
        // if (data) {
        //     const user = data.me
            return <TwoFASwitch {...props} user={user}  setLoader={setLoader}/>
                // <div>
                //     <label>Enable your Two-Factor Authentication</label>

                // {/*    {user.twoFactorEnabled && <div className={" QR"}>*/}
                // {/*        <h3>Scan QR</h3>*/}
                // {/*        <img src={user.twoFactorCode} alt={""}/>*/}
                // {/*        <p>Open the Google Authenticator app and scan this QR code</p>*/}
                // {/*    </div>*/}
                // {/*    }*/}
                // {/*</div>*/}

        // }else {
        //     return <div>Refresh</div>
        // }
    }
    return(
        <AccountLayout {...props}>
            <div className={'two-fa'}>
                <h1>Two-Factor Authentication</h1>
                {RenderData()}
            </div>
        </AccountLayout>
    )
}


export default   compose(
    connect(null, {setUser}),
    withAlert()
)(TwoFA);
