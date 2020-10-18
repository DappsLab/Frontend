import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './assets/scss/app.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/Reducer';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import 'semantic-ui-css/semantic.min.css'

const store = createStore(rootReducer, composeWithDevTools());
//Apollo client setup
const client=new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

const  App=()=>{
    return(
        <ApolloProvider client={client}>
            <Routes/>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
   , document.getElementById("root")
);
