import React from 'react';
import {useQuery} from "@apollo/client";
import { getTestBinery} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";

const TestGetBinery = (props) => {
    const {data,error,loading}=useQuery(getTestBinery,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:props.id
        },onCompleted:data1 => {
            props.setLoading(false)
            console.log(data1)
        },onError:error1 => {
            console.log(error1.toString())
            props.setLoading(false)
        }
    })
    // if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data&&!loading) {
        let blob = new Blob([data.testGetBinary], { type: ' text/plain' });
        return (
            <div>
                <a style={{margin:"20px 0"}} className={'downlaod'} download href={URL.createObjectURL(blob)}
                   // target={'_blank'}
                >Download Binary</a>
            </div>
        );
    }
    return <div>Nont found</div>
}

export default TestGetBinery;