import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './assets/scss/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/Reducer';

import { ApolloProvider} from "react-apollo";
import {ApolloClient, ApolloLink, concat, InMemoryCache} from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
import 'semantic-ui-css/semantic.min.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';


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


const  App =()=>{
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if (token){
            // console.log(token);
        }
    })
    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <Routes/>
        </AlertProvider>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Router>
    </Provider>
   , document.getElementById("root")
);
