import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/Reducer';
import { ApolloProvider} from "react-apollo";
import {ApolloClient, ApolloLink, concat, gql, InMemoryCache} from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
import 'semantic-ui-css/semantic.min.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Spinner from "./components/ui/Spinner";
import App from "./App";


const store = createStore(rootReducer, composeWithDevTools());
const options = {
    position: positions.TOP_CENTER,
    timeout: 10000,
    offset: '30px',
    transition: transitions.SCALE
}


const link=createUploadLink({uri:"http://localhost:4000/graphql"});
const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: localStorage.getItem('token') || null,
        }
    });

    return forward(operation);
})
const client = new ApolloClient({
    link:concat(authMiddleware,link),
    cache: new InMemoryCache(),
});
const  Main =()=>{
    const [user,setUser]=useState(null);
    const renderData=()=>{
        if (!!localStorage.getItem('token') ) {
            client.query({
                query: gql`query {
                    me{
                        avatar address fullName id
                        email location userName
                        kyc{ kycStatus }
                    }
                }`
            }).then(result => {
                setUser(result.data.me);
            }).catch(e => {
                console.log(e)
            });
            if (user===null){
                return <Spinner/>
            }
            if (user){
                return <App user={user}/>
            }
        }else {
            return <App user={null}/>
        }
    }
    return  (
        <AlertProvider template={AlertTemplate} {...options}>
            {renderData()}
        </AlertProvider>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ApolloProvider client={client}>
                <Main/>
            </ApolloProvider>
        </Router>
    </Provider>
   , document.getElementById("root")
);
