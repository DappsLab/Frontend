import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/root-reducer';
import { ApolloProvider} from "react-apollo";
import {ApolloClient,ApolloLink, concat, InMemoryCache} from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
import 'semantic-ui-css/semantic.min.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Routes from "./routes";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {DAPPSLAB_PORT, SERVER_URL} from "./constants";



const store = createStore(rootReducer, composeWithDevTools());
const options = {
    position: positions.TOP_CENTER,
    timeout: 10000,
    offset: '30px',
    transition: transitions.SCALE
}


const link=createUploadLink({uri:`${SERVER_URL}${DAPPSLAB_PORT}/graphql`});
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
    return  (
        <AlertProvider template={AlertTemplate} {...options}>
            <Routes/>
        </AlertProvider>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
            <ApolloProvider client={client}>
                <Main/>
            </ApolloProvider>
        </Router>
    </Provider>
   , document.getElementById("root")
);
