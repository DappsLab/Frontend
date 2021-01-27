import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {transferAmount} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import FormInput from "../../../ui/form-input/form-input.component";
import CustomButton from "../../../ui/custom-button/custom-button.component";
import {withAlert} from "react-alert";
import {FormValidation} from "../../../ui/mise";

const Withdraw = ({alert,history}) => {
    const [address,setAddress]=useState('')
    const [amount, setAmount] = useState("");
    const [transfer]=useMutation(transferAmount,{
        client:Client,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        },onCompleted:data => {
           if (data){
               alert.success("Transfer Successfully",{timeout:2000})
               history.push('/account_settings/withdraw&deposite')
           }
        }
    })
    const handleSubmit=(event)=>{
        event.preventDefault();
        if (address===''||amount===''){
            alert.error("Both Fileds Required");
        }else{
            transfer({
                variables:{
                    address:address,
                    amount:amount
                }
            }).catch(err=>{
                console.log(err.toString())
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormInput type={'text'} name={'address'} label={"Receipt Address"} handleChange={
                (event)=>setAddress(event.target.value)
            } value={address}/>

            <FormInput type={'text'} name={"amount"} label={"Transfer Amount"} handleChange={
                (event)=> {
                    setAmount(FormValidation(amount, event.target.value, event.target.name))
                }
            } value={amount}/>
            <CustomButton type={'submit'}>Withdraw</CustomButton>
        </form>
    );
};

export default withAlert() (Withdraw);
