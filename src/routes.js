import React from 'react';
import {Route} from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./components/home/Home";
import AboutUs from "./components/home/AboutUs";
import BlockExplorer from "./components/home/Block_Explorer";
import Dapps from "./components/home/Dapps";
import Downloads from "./components/home/Downloads";
import Help from "./components/home/Help";
import Smart_Contracts from "./components/home/exploreContract/Smart_Contracts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";


const Routes = () => {
    return (
        <Layout>
            <Route path={"/register"} exact component={Register}/>
            <Route path={"/login"} exact component={Login}/>
            <Route path={"/smart_contracts"} exact component={Smart_Contracts}/>
            <Route path={"/help"} exact component={Help}/>
            <Route path={"/downloads"} exact component={Downloads}/>
            <Route path={"/dapps"} exact component={Dapps}/>
            <Route path={"/block_explorer"} exact component={BlockExplorer}/>
            <Route path={"/about_us"} exact component={AboutUs}/>
            <Route path={"/"} exact component={Home}/>
        </Layout>
    );
};

export default Routes;
