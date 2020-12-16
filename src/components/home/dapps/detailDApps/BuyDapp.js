import React, {useState} from 'react';
import {Button, Container, Form, Input, Segment} from "semantic-ui-react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {orderContract, purchaseDapp,verifyOrder} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {Slider} from "react-semantic-ui-range";
import {feeProcessTime} from "../../../ui/Helpers";
import {timer} from "redux-logger/src/helpers";

const BuyDapp = (props) => {
    const [currentUser,setCurrentUser]=useState(props.currentUser);
    const [loading,setLoading]=useState(false);
    const [fee,setFee]=useState(100000);
    const [downalaod,setDownlaod]=useState(false);
    const [purchased,setPurchased]=useState();
    const alert=props.alert;
    console.log(currentUser)
    const [buydApp]=useMutation(orderContract,{
        client:Client, context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onCompleted:data => {
            console.log(data)
            verifiyOrder({variables:{
                    id:data.placeOrder.id
                }
            }).catch(err=>{
                console.log('verify error',err.toString());
            })
        },
        onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    });
    const [verifiyOrder]=useLazyQuery(verifyOrder,{
        client:Client, context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },onCompleted:data => {
            console.log(data)
            // if (data.verifyOrder){
            //     purchase({variables:{
            //
            //         }})
            // }else {
            //     alert.error("Order Succesfull. Purchased Failed",{timeout:3000})
            // }
        },
        onError:error => {
            alert.success("Order Succesfull.",{timeout:3000})
            alert.error(error.toString(),{timeout:3000})
        }
    });
    // const [purchase]=useMutation(purchaseDapp, {
    //     client: Client, context: {
    //         headers: {
    //             authorization: localStorage.getItem("token")
    //         }
    //     },
    //     onError:error => {
    //         alert.error(error.toString(),{timeout:5000})
    //     },
    //     onCompleted:data => {
    //         setPurchased(data.purchaseDApp)
    //     }
    // })

    const HandelBuy=()=>{
        buydApp({variables:{
                producttype:'DAPP',
                fee: fee.toString(),
                did:props.id,
                type:'SINGLELICENSE'
            }
        }).catch(err=>{
            console.log("buy error",err.toString())
        })
    }
    return (
        <Segment className={"buy-dapps"}>
            <h2>Buy Dapp</h2>
            <div className={"flex"}>
                <FontAwesomeIcon className={"checkCircle"} icon={faCheckCircle}/>
                <p>Reviewed by Dappslab</p>
            </div>
            <Form >
                <Form.Field>
                    <label>Dapp Price</label>
                    <Input
                        fluid size={'large'}
                        disabled label={{ basic: true, content: 'Dapps' }}
                        value={props.price}
                    />
                </Form.Field>
            </Form>
            {currentUser&&(
                currentUser.kyc.kycStatus==="VERIFIED"?
                    <div>
                        <Form>
                        <Form.Field className={"slider flex"}>
                            <label>Set fee</label>
                            <Form.Group>
                                <Slider
                                    color="green"
                                    inverted={false}
                                    settings={{
                                        start: 100000,
                                        min: 30000,
                                        max: 999999,
                                        step: 200,
                                        onChange: value => {
                                            setFee(value);
                                        }
                                    }}
                                />
                                <p>This is the most amount of money that might be used to process this
                                    transaction. Your transaction will be processed in the
                                    <span>{feeProcessTime(fee)}</span>
                                </p>
                            </Form.Group>
                        </Form.Field>
                        <Form.Field >
                            <label>Fee</label>
                            <Input
                                fluid size={'large'}
                                disabled label={{ basic: true, content: 'Wei' }}
                                value={fee}
                            />
                        </Form.Field>
                        </Form>
                        <Button onClick={HandelBuy}  fluid className={"buybtn"}>Buy Dapp</Button>
                    </div>
                :
                    <Container fluid className={"kyc_information"}>
                        <p>Before you can purchase this contract, you have to complete your KYC information and get validated.</p>
                        <Button  fluid onClick={()=>{props.history.push('/account_settings')}} className={"testbtn"}>Verify your Account</Button>
                    </Container>
            )
            }
        </Segment>
    );
};

export default withAlert()(BuyDapp);