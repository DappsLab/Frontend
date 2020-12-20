import React, {useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import {withAlert} from "react-alert";
import {useLazyQuery, useMutation} from "@apollo/client";
import {orderContract, purchaseDapp, purchasedContract, verifyOrder} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";

const BuySmartContract = (props) => {
    const [buyLoading,setBuyLoading]=useState(false)
    const [orderID,setOrderID]=useState();
    const {alert,type,fee,user,contract}=props;

    const context= {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }
    const [order]=useMutation(orderContract,{
        client:Client, context:context,
        onCompleted:data => {
            setOrderID(data.placeOrder.id);
            verifiyOrder({variables:{
                    id:data.placeOrder.id
                }
            })
        },
        onError:error => {
            setBuyLoading(false)
            alert.error(error.toString(),{timeout:3000})
        }
    });
    const [verifiyOrder]=useLazyQuery(verifyOrder,{
        client:Client, context:context,
        onCompleted:data => {
            if (data.verifyOrder){
                purchase({
                    variables:{
                        SID:contract.id,
                        OID:orderID
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else {
                props.refetch()
                setBuyLoading(false)
                props.history.push("/dashboard/ordered_contract")
                alert.error("Order Succesfull. Purchased Failed",{timeout:3000})
            }
        },
        onError:error => {
            props.refetch()
            setBuyLoading(false)
            alert.success("Order Succesfull.",{timeout:3000})
            alert.error(error.toString(),{timeout:3000})
        }
    });
    const [purchase]=useMutation(purchasedContract, {
        client: Client, context:context,
        onError:error => {
            props.refetch()
            props.history.push("/dashboard/ordered_contract")
            alert.success("Order Succesfull",{timeout:5000})
            alert.error("purchasd Failed "+error.toString(),{timeout:5000})
        },
        onCompleted:data => {
            alert.success("Congratulation, You purchasd Smart contract Successfully",{timeout:5000})
            props.refetch()
            setBuyLoading(false)
        }
    })
    const handleBuy=()=>{
        setBuyLoading(true);
        order({
            variables:{
                producttype:'SMARTCONTRACT',
                fee: fee.toString(),
                id:contract.id,
                type:type
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }


    return (
        user.kyc.kycStatus==="VERIFIED")?
        <Button loading={buyLoading} fluid onClick={handleBuy} className={"testbtn"}>Buy contract</Button>
        :
        <Container fluid className={"kyc_information"}>
            <p>Before you can purchase this contract, you have to complete your KYC information and get validated.</p>
            <Button  fluid onClick={()=>{props.history.push('/account_settings')}} className={"testbtn"}>Verify your Account</Button>
        </Container>
}

export default  withAlert()(BuySmartContract);