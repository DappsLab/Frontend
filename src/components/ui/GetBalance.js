import React, {useEffect,useState} from 'react';
import {getContractBalance} from "./ContractInteractionHelper";

const GetBalance = (props) => {
    const [balance,setBalance]=useState('Loading');
   useEffect( ()=>{
       let getBalance=async ()=> {
           const value = await getContractBalance(props.address);
           setBalance(value)
       }
     getBalance()
   })
    return (
        <div>
            {balance}
        </div>
    );
};

export default GetBalance;
