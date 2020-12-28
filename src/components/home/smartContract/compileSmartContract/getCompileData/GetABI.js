import React from 'react';
import {useQuery} from "@apollo/client";
import {getABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";

const GetABI = (props) => {
    const {data,error,loading}=useQuery(getABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:props.id
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        let blob = new Blob([data.getABI], { type: ' application/json' });
        return (
            <div>

                <a className={'downlaod'} download href={URL.createObjectURL(blob)} target={'_blank'}>Download ABI</a>
            </div>
        )
    }
    return <div>Nont found</div>
};

export default GetABI;