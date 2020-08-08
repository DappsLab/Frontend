import React from 'react';
import {Route} from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./components/home/Home";


const Routes = () => {
    return (
        <Layout>
            <Route path={"/"} exact component={Home}/>
        </Layout>
    );
};

export default Routes;