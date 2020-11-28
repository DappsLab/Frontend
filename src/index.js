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
import {Spinner} from "./components/ui/Spinner";
import Routes from "./routes";


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
    const [user,setUser]=useState(null);
    const renderData=()=>{
        if (!!localStorage.getItem('token') ) {
            client.query({query: gql`query {
                me{
                    avatar address fullName id type twoFactorCode
                    email location userName twoFactorEnabled balance
                    kyc{   birthDate
                        building
                        city
                        country
                        kycStatus mobile
                        nationality
                        postalCode
                        street
                        kycStatus
                    }
                    orders{
                        id
                        dateTime
                        fee
                        price
                        smartContract {
                            contractName
                        }
                        status
                        transactionHash
                    }
                }
            }`
        }).then().then(result => {
                console.log("index",result.data.me)
                setUser(result.data.me);
            }).catch(e => {
                console.log(e.toString())
                return <Routes {...props} user={user}/>
            });
            if (user===null){
                return <Spinner/>
            }
            if (user){
                return <Routes {...props} user={user}/>
            }
        }else {
            return <Routes {...props} user={null}/>
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
                <Main />
            </ApolloProvider>
        </Router>
    </Provider>
   , document.getElementById("root")
);
