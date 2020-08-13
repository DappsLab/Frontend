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
import SearchResult from "./components/home/exploreContract/SearchResult";
import DetailedContract from "./components/home/exploreContract/DetailedContract";


const Routes = (props) => {
    return (
        <Layout {...props}>
            <Route {...props} path={"/detailed_contract/:id"} exact component={DetailedContract}/>
            <Route {...props} path={"/search_result"} exact component={SearchResult}/>
            <Route {...props} path={"/register"} exact component={Register}/>
            <Route {...props} path={"/login"} exact component={Login}/>
            <Route {...props} path={"/smart_contracts"} exact component={Smart_Contracts}/>
            <Route {...props} path={"/help"} exact component={Help}/>
            <Route {...props} path={"/downloads"} exact component={Downloads}/>
            <Route {...props} path={"/dapps"} exact component={Dapps}/>
            <Route {...props} path={"/block_explorer"} exact component={BlockExplorer}/>
            <Route {...props} path={"/about_us"} exact component={AboutUs}/>
            <Route {...props} path={"/"} exact component={Home}/>
        </Layout>
    );
};

export default Routes;
