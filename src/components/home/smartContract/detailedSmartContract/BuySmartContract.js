import React, {useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import {withAlert} from "react-alert";

const BuySmartContract = (props) => {
    const [buyLoading,setBuyLoading]=useState(false)
    const {alert,type,fee,user,contract}=props;

    const handleBuy=()=>{
        setBuyLoading(true);
        //     const contractData=this.props.data.smartContractById;
        //     this.props.orderContract({
        //         variables:{
        //             producttype:'SMARTCONTRACT',
        //             fee: fee.toString(),
        //             id:contractData.id,
        //             type:radioValue
        //         }
        //     }).then(function (result){
        //
        //         if (result.data.placeOrder) {
        //             const orderId=result.data.placeOrder.id;
        //             that.client.query({
        //                 query: gql`query  ($id:ID!){
        //                     verifyOrder(id: $id)
        //                 }`,variables: {id: orderId}
        //             }).then(result => {
        //                     if (result.data.verifyOrder){
        //                     that.Authclient.mutate({
        //                         mutation:gql`
        //                             mutation ($SID:String!,$OID:String!){
        //                                 purchaseContract(newPurchase: {smartContractId:$SID, orderId: $OID}) {
        //                                     createdAt
        //                                 }
        //                             }
        //                         `,variables:{SID:contractData.id,OID:orderId}
        //                     }).then(result=>{
        //                         that.meQuery().then(result => {
        //                             that.props.setUser(result.data.me);
        //                             that.setState({currentUser:result.data.me,buy_loading: false},()=>{});
        //                             alert.success("License Purchased Successfully", {timeout:2000})
        //                             that.props.history.push("/dashboard/purchased_contracts")
        //                         }).catch(e => {
        //                             console.log(e);
        //                             that.meQuery().then(result => {
        //                                 that.props.setUser(result.data.me);
        //                                 alert.success("Purchased Failed", {timeout:5000})
        //                                 alert.error("Order Successfully", {timeout:5000})
        //                                 that.setState({currentUser:result.data.me,buy_loading:false},()=>{})
        //                                 that.props.history.push("/dashboard/ordered_contract")
        //                             }).catch(e => {
        //                                 console.log(e)
        //                                 alert.error(e.toString(),{timeout:5000})
        //                                 that.setState({buy_loading: false})
        //                             });
        //                         });
        //                     }).catch(e=>{
        //                         console.log(e)
        //                         that.setState({buy_loading: false})
        //                         alert.error(e.toString(),{timeout:2000})
        //                         that.meQuery().then(result => {
        //                             that.props.setUser(result.data.me);
        //                             alert.success("Order Successfully", {timeout:2000})
        //                             that.setState({buy_loading:false})
        //                             that.props.history.push("/dashboard/ordered_contract")
        //                         }).catch(e => {
        //                             console.log(e)
        //                             that.setState({buy_loading: false})
        //                             alert.error(e.toString(),{timeout:5000})
        //                         });
        //                     })
        //                 }else {
        //                     that.meQuery().then(result => {
        //                         that.props.setUser(result.data.me);
        //                         alert.success("Order Successfully", {timeout:2000})
        //                         that.setState({buy_loading:false})
        //                         that.props.history.push("/dashboard/ordered_contract")
        //                     }).catch(e => {
        //                         console.log(e)
        //                         that.setState({buy_loading: false})
        //                         alert.error(e.toString(),{timeout:5000})
        //                     });
        //                 }
        //             }).catch(e => {
        //                 that.setState({buy_loading:false});
        //                 console.log(e.toString())
        //                 alert.error(e.toString(),{time:500});
        //             });
        //         }
        //     }).catch(function (error){
        //         that.setState({buy_loading:false});
        //         console.log(error.toString());
        //         alert.error(error.toString(),{time:500});
        //     })
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