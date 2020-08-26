import React from 'react';
import {Route} from "react-router-dom";
import Layout from "./hoc/Layout";
import Home from "./components/home/Home";
import AboutUs from "./components/home/AboutUs";
import BlockExplorer from "./components/home/Block_Explorer";
import Dapps from "./components/home/Dapps";
import Downloads from "./components/home/Downloads";
import Help from "./components/home/Help";
import Smart_Contracts from "./components/home/smartContract/Smart_Contracts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import SearchResult from "./components/home/search/SearchResult";
import DetailedContract from "./components/home/smartContract/DetailedContract";
import GeneralSetting from "./components/user/myAccount/GeneralSetting";
import WithdrawDeposite from "./components/user/myAccount/WithdrawDeposite";
import Transactions from "./components/user/myAccount/Transactions";
import TwoFA from "./components/user/myAccount/TwoFA";
import GeneralInfo from "./components/home/uploadContract/GeneralInfo";
import AssociatedFiles from "./components/home/uploadContract/AssociatedFiles";
import ChangePassword from "./components/user/myAccount/ChangePassword";



const Routes = (props) => {
    return (
        <Layout {...props}>
            <Route {...props} path={"/account/profile/changr_password"} exact component={ChangePassword}/>
            <Route {...props} path={"/account/profile/2fa"} exact component={TwoFA}/>
            <Route {...props} path={"/account/profile/transactions"} exact component={Transactions}/>
            <Route {...props} path={"/account/profile/wallet"} exact component={WithdrawDeposite}/>
            <Route {...props} path={"/account/profile"} exact component={GeneralSetting}/>

            <Route {...props} path={"/upload_samrt_contract/general_info"} exact component={GeneralInfo}/>
            <Route {...props} path={"/upload_samrt_contract/associated_files"} exact component={AssociatedFiles}/>
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
