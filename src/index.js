import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './assets/scss/app.css';
import { createStore } from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer/Reducer';


const store = createStore(rootReducer, composeWithDevTools());

const  App=()=>{
    return(
        <Routes/>
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
