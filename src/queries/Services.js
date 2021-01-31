import {ApolloClient, InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {DAPPSLAB_PORT, SERVER_URL} from "../constants";



export const Client = new ApolloClient({
    link: createUploadLink({uri:`${SERVER_URL}${DAPPSLAB_PORT}/graphql`}),
    cache: new InMemoryCache(),
    headers:{
        authorization:localStorage.getItem('token')||null
    }
})
export const match=(data)=>{
    if (data.toString().toLowerCase().includes("error: authentication must be provided")){
        localStorage.removeItem('token');
        // console.log("here")
        // window.location.reload();
        return 'authentication'
    }
    if (data.toString().toLowerCase().includes('error: failed to fetch')){
        return 'fetch';
    }
    return 'fetch'
}

export const ErrorStringMatch=(data)=>{
    if (data.toString().toLowerCase().includes("error: authentication must be provided")){
        localStorage.removeItem('token');
        // console.log("here")
        // window.location.reload();
        return "authentication"
    }
    if (data.toString().toLowerCase().includes('error: failed to fetch')){
        localStorage.removeItem('token')
        return "fetch";
    }
}