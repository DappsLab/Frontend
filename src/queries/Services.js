
import React from 'react';
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";



export const Client = new ApolloClient({
    link: createUploadLink({uri:"http://localhost:4000/graphql"}),
    cache: new InMemoryCache(),
    headers:{
        authorization:localStorage.getItem('token')||null
    }
})
export const match=(data)=>{
    if (data.toString().toLowerCase().includes("cannot return null for non-nullable field query.me")){
        // localStorage.removeItem('token');
        return true
    }
    if (data.toString().toLowerCase().includes('error: failed to fetch')){
        // localStorage.removeItem('token')
        return true;
    }
}

