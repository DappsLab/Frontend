import React from 'react';
import {Icon} from "semantic-ui-react";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {getZip} from "../../../../queries/queries";

const DownlaodDapp = ({check,purchased}) => {
    const pid=purchased.id;
    const did=purchased.dApp.id;
    const lid=purchased.licenses.slice(-1)[0].id
    const rest=true;
    const {loading,error,data}=useQuery(getZip,{
        client:Client,
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },variables:{
            did:did,
            pid:pid,
            lid:lid
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        return (check?
            <div className={'download-dapp'}>
                <Icon circular size={'huge'} inverted color='green' name={'checkmark'}/>
                <p>Dapp Purchased. Now you can downlaod your dapp by clicking on below button</p>
                <a className={'downlaod'} target={'_blank'} download href={data.getZip}>Download</a>
            </div>
                : <a className={'downlaod'} target={'_blank'} download href={data.getZip}>Download</a>
        );
    }
};

export default DownlaodDapp;