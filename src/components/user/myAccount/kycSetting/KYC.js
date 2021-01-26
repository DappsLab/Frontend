import React from 'react';
import "../../../../assets/scss/kyc.css";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../../reducer/user/user.actions";
import {withAlert} from "react-alert";
import AccountLayout from "../../../../hoc/AccountLayout";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import UpdateKYC from "./UpdateKYC";


const Kyc =(props)=> {
    const {setUser} = props

    const  RenderData= ()=> {
        const {data, error, loading, refetch} = useQuery(me_Query, {
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }, fetchPolicy: 'network-only',
            onCompleted: data1 => {
                setUser(data1.me)
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const user = data.me
            return (
                <section className={"kyc_section"}>
                    <div className={'flex'}>
                        <h2>KYC <span> (Account Verification)</span></h2>
                        <h3>Status: <span
                            className={user.kyc.kycStatus === "VERIFIED" ? "green" : "yellow"}>{user.kyc.kycStatus} </span>
                        </h3>
                    </div>
                    <UpdateKYC fetch={refetch} user={user}/>
                </section>
            );
        }
        return <div>Refresh</div>
    }
    return(
        <AccountLayout {...props}>
            {RenderData()}
        </AccountLayout>
    )
}

export default  compose(
    connect(null, {setUser}), withAlert(),
)(Kyc);





