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
    if (data.toString().toLowerCase().includes("error: authentication must be provided")){
        localStorage.removeItem('token');
        // console.log("here")
        // window.location.reload();
        return true
    }
    if (data.toString().toLowerCase().includes('error: failed to fetch')){
        localStorage.removeItem('token')
        return true;
    }
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