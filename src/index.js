import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/Reducer';
import { ApolloProvider,Query} from "react-apollo";
import {ApolloClient, useQuery,ApolloLink, concat, InMemoryCache} from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
import 'semantic-ui-css/semantic.min.css'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import {Spinner} from "./components/ui/Spinner";
import Routes from "./routes";
import {me_Query} from "./queries/queries";
import {match} from "./queries/Services";


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
const  Main =(props)=>{
    const RenderData=()=>{
        const {loading,data,error} =useQuery(me_Query,{client:client})
        if (loading) return <Spinner/>
        if (error) return (
            match(error.toString())?
                <Routes {...props} user={null}/>:
                <div>{error.toString()}</div>
        )
        return <Routes {...props} user={data.me}/>
    }
    return  (
        <AlertProvider template={AlertTemplate} {...options}>
            {RenderData()}
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
