import React, {useState} from 'react';
import Layout from "../../../hoc/Layout";
import './unblock_request.styles.css'
import {useMutation} from "@apollo/client";
import {createUnBlockRequest} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";
import CustomButton from "../../ui/custom-button/custom-button.component";
import logo from "../../../assets/images/logo_dapps.png";
import bar1 from "../../../assets/images/bar1.png";
import Rectangle2 from "../../../assets/images/Rectangle2.png";
import Rectangle3 from "../../../assets/images/Rectangle3.png";

const UnBlockRequest = (props) => {
    const [description, setDescription] = useState('');
    const {alert,history}=props
    const [unblockRequest]=useMutation(createUnBlockRequest,{
        client:Client,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onCompleted:data => {
            alert.success("Request Submit Successfully",{timeout:2000})
            history.push('/')
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const handleSubmit=(event)=>{
        event.preventDefault()
        if (description.length>0){
            unblockRequest({
                variables:{
                    description:description
                }
            }).catch(err=>{
                console.log(err.toString())
            })
        }else {
            alert.error("Empty Fields Not Allowed")
        }
    }
    return (
        <Layout>
            <div className="register-wrapper unblock_container">
                <div className="login-wrapper">
                    <div className="loginRight">
                        <div className="logo">
                            <img src={logo} alt={"img"}/>
                        </div>
                        <div className="form">
                            <h2>Request</h2>
                            <img className="bar1" src={bar1} alt={'bar'}/><br/>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    onChange={(event)=>setDescription(event.target.value)}
                                    value={description}
                                > </textarea>
                                <CustomButton type={'submit'}>Submit Request</CustomButton>
                            </form>
                        </div>
                    </div>
                    <div className="loginleft flex password-left">
                        <div className={'pass-contect'}>
                            <h1>Request to Dappslab</h1>
                            <img src={Rectangle2} alt={''} width={"85px"} height={"85px"}/>
                        </div>
                        <p>Place request to unblock your Account</p>
                        <img className="box2" src={Rectangle3} alt={'img'}/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withAlert() (UnBlockRequest);
