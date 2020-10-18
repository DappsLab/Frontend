import React from 'react';
import {Route, Switch} from "react-router-dom";

//Routes Setup
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
import Logout from "./components/user/myAccount/Logout";
import ResetPassword from "./components/login/ResetPassword";



class Routes extends React.Component{

   render() {
       return (
           <Switch >
               <Route  path={"/account/profile/changr_password"} exact component={ChangePassword}/>
               <Route  path={"/account/profile/2fa"} exact component={TwoFA}/>
               <Route  path={"/account/profile/transactions"} exact component={Transactions}/>
               <Route  path={"/account/profile/wallet"} exact component={WithdrawDeposite}/>
               <Route  path={"/account/profile"} exact component={GeneralSetting}/>

               <Route  path={"/logout"} exact component={Logout}/>
               <Route  path={"/upload_samrt_contract/general_info"} exact component={GeneralInfo}/>
               <Route  path={"/upload_samrt_contract/associated_files"} exact component={AssociatedFiles}/>
               <Route  path={"/detailed_contract/:id"} exact component={DetailedContract}/>
               <Route  path={"/search_result"} exact component={SearchResult}/>
               <Route  path={"/forget_password"} exact component={ResetPassword}/>
               <Route  path={"/register"} exact component={Register}/>
               <Route  path={"/login"} exact component={Login}/>
               <Route  path={"/smart_contracts"} exact component={Smart_Contracts}/>
               <Route  path={"/help"} exact component={Help}/>
               <Route  path={"/downloads"} exact component={Downloads}/>
               <Route  path={"/dapps"} exact component={Dapps}/>
               <Route  path={"/block_explorer"} exact component={BlockExplorer}/>
               <Route  path={"/about_us"} exact component={AboutUs}/>
               <Route  path={"/"} exact component={Home}/>
           </Switch>
       );
   }
}

export default Routes;
