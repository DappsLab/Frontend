import React from 'react';
import Layout from "../../../hoc/Layout";
import '../../../assets/scss/request_smart_contract.css'
import SubmitRequest from "./SubmitRequest";
import {infoData} from "../../ui/Helpers";
import {Icon} from "semantic-ui-react";


const RequestSmartContract = (props) => {
    return (
        <Layout>
            <div className={'request-contract'}>
                <h1>Place a Request For New Smart Contract</h1>
                <div className={"request-info flex"}>
                    {infoData.map((info,index)=>(
                        <div key={index}>
                            <Icon name={info.icon}/>
                            <h3>{info.heading}</h3>
                            <p>{info.detail}</p>
                        </div>
                    ))}
                </div>
                <SubmitRequest {...props} />
            </div>
        </Layout>
    );
};

export default RequestSmartContract;