import React, {useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {
    placeTestOrder,
    purchasedTestOrder,
    verifyTestOrder
} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";

const BuyTestSmartContract = (props) => {
    const [buyLoading,setBuyLoading]=useState(false)
    const [orderID,setOrderID]=useState();
    const {alert,type,fee,user,address,contract}=props;
    const context= {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    const handleTestBuy=()=>{
        setBuyLoading(true);
        orderTest({
            variables:{
                addressId:address,
                producttype:'SMARTCONTRACT',
                fee: fee.toString(),
                id:contract.id,
                type:type,
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }

    const [orderTest]=useMutation(placeTestOrder,{
        client:Client, context:context,
        onCompleted:data => {
            setOrderID(data.placeTestOrder.id);
            verifiyTest({variables:{
                    id:data.placeTestOrder.id
                }
            })
        },
        onError:error => {
            setBuyLoading(false)
            alert.error(error.toString(),{timeout:3000})
        }
    });
    const [verifiyTest]=useLazyQuery(verifyTestOrder,{
        client:Client, context:context,
        onCompleted:data => {
            if (data.verifyTestOrder){
                purchaseTest({
                    variables:{
                        sid:contract.id,
                        oid:orderID
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else {
                props.refetch()
                setBuyLoading(false)
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
    const [purchaseTest]=useMutation(purchasedTestOrder, {
        client: Client, context:context,
        onError:error => {
            props.refetch()
            alert.success("Order Succesfull",{timeout:5000})
            alert.error("purchasd Failed "+error.toString(),{timeout:5000})
        },
        onCompleted:data => {
            alert.success("Congratulation, You purchasd Dapps Successfully",{timeout:5000})
            props.refetch()
            setBuyLoading(false)
        }
    })



    return (
        user.testAddress.length>0?
        <Button loading={buyLoading} disabled={address === ""}  fluid onClick={handleTestBuy} className={"testbtn"}>Buy Test contract</Button>
            : <Container fluid className={"kyc_information"}>
                <p>Before you can Test this contract, you have to atleast one  Test Addresses.</p>
                {/*<Button  fluid onClick={()=>{props.history.push('/add_test_address')}} className={"testbtn"}>Add Test Address</Button>*/}
            </Container>
    );
}

export default withAlert()(BuyTestSmartContract);