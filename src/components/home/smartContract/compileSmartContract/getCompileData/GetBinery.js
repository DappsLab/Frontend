import React from 'react';
import {useQuery} from "@apollo/client";
import {getBinery} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";

const GetBinery = (props) => {
    const {data,error,loading}=useQuery(getBinery,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:props.id
        },onCompleted:data1 => {
            props.setLoading(false)
        },onError:error1 => {
            props.setLoading(false)
        }
    })
    // if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        let blob = new Blob([data.getBinary], { type: ' text/plain' });
        return (
            <div>
                <a style={{margin:"20px 0"}} className={'downlaod'} download href={URL.createObjectURL(blob)} target={'_blank'}>Download Binary</a>
            </div>
        );
    }
    return <div>Nont found</div>
};

export default GetBinery;