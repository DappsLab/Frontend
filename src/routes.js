import React, {Component} from 'react';
import {Switch} from "react-router-dom";


//Routes Setup
import Home from "./components/home/Home";
import AboutUs from "./components/home/AboutUs";
import BlockExplorer from "./components/block_explorer/BlockExplorer";
import Dapps from "./components/home/Dapps";
import Downloads from "./components/home/Downloads";
import Help from "./components/home/Help";
import Smart_Contracts from "./components/home/smartContract/Smart_Contracts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import SearchResult from "./components/home/search/SearchResult";
import DetailedContract from "./components/home/smartContract/DetailedContract";
import Logout from "./components/user/myAccount/Logout";
import ResetPassword from "./components/login/ResetPassword";
import Purchased from "./components/user/dashboard/Purchased";
import TestContract from "./components/user/dashboard/TestContract";
import DevelopedContracts from "./components/user/dashboard/DevelopedContracts";
import PublicRoute from "./components/route_auth/PublicRoute";
import PrivateRoute from "./components/route_auth/PrivateRoute";
import DeleteUser from "./queries/DeleteUser";
import ConfirmEmail from "./components/user/ConfirmEmail";
import ChangePassword from "./components/user/ChangePassword";
import UploadSmartContract from "./components/home/uploadContract/UploadSmartContract";
import FAConfirmation from "./components/user/2FAConfirmation";
import UserAccount from "./components/user/myAccount/UserAccount";
import Admin from "./components/admin/Admin";


class Routes extends Component{
     render() {
         return (
         <Switch>

              <PrivateRoute  path={"/dashboard/developed_contract"} component={DevelopedContracts}/>
              <PrivateRoute  path={"/dashboard/test_contract"} component={TestContract}/>
              <PrivateRoute  path={"/dashboard/purchased"} component={Purchased}/>
              <PrivateRoute  path={"/account_settings"}  component={UserAccount}/>
              <PrivateRoute  path={"/logout"} component={Logout}/>
              <PrivateRoute  path={"/delete_user"} component={DeleteUser}/>
              <PrivateRoute  path={"/upload_samrt_contract"} component={UploadSmartContract}/>
              <PrivateRoute  path={"/admin"} component={Admin}/>

              <PublicRoute  path={"/2FA_varifivcation"} component={FAConfirmation}/>
              <PublicRoute  path={"/user/reset-password/:key"} component={ChangePassword}/>
              <PublicRoute  path={"/user/confirm/:key"} component={ConfirmEmail}/>
              <PublicRoute  path={"/detailed_contract/:id"} component={DetailedContract}/>
              <PublicRoute  path={"/search_result/:search"} component={SearchResult}/>
              <PublicRoute  path={"/forget_password"} component={ResetPassword}/>
              <PublicRoute  path={"/register"} component={Register}/>
              <PublicRoute  path={"/login"} component={Login}/>
              <PublicRoute  path={"/smart_contracts"} component={Smart_Contracts}/>
              <PublicRoute  path={"/help"} component={Help}/>
              <PublicRoute  path={"/downloads"} component={Downloads}/>
              <PublicRoute  path={"/dapps"} component={Dapps}/>
              <PublicRoute  path={"/block_explorer"} component={BlockExplorer}/>
              <PublicRoute  path={"/about_us"} component={AboutUs}/>
              <PublicRoute  path={"/"} component={Home}/>
         </Switch>
         );
     }
}

export default  (Routes);
