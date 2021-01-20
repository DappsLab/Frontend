import React, {useEffect, useState} from 'react';
import { getMainContractBalance} from "./ContractInteractionHelper";

const GetMainAddress = (props) => {
    const [balance,setBalance]=useState('Loading');
    useEffect(()=>{
        let getBalance=async ()=> {
            const value = await getMainContractBalance(props.address);
            setBalance(value)
        }
        getBalance()
    })
    return balance!=='Loading'?(
        <div>{balance}</div>
    ):<div>Loading</div>
};

export default GetMainAddress;
