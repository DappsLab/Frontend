import React, {useEffect} from 'react';
import {Switch} from "react-router-dom";


//Routes Setup
import Home from "./components/home/Home";
import AboutUs from "./components/home/AboutUs";
import BlockExplorer from "./components/block_explorer/BlockExplorer";
import Dapps from "./components/home/dapps/Dapps";
import Downloads from "./components/home/Downloads";
import Help from "./components/home/Help";
import Smart_Contracts from "./components/home/smartContract/Smart_Contracts";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import SearchResult from "./components/home/search/SearchResult";
import DetailedContract from "./components/home/smartContract/DetailedContract";
import Logout from "./components/user/myAccount/Logout";
import ResetPassword from "./components/login/ResetPassword";
import Purchased from "./components/user/dashboard/purchased/Purchased";
import TestContract from "./components/user/dashboard/TestContract";
import DevelopedContracts from "./components/user/dashboard/developedContract/DevelopedContracts";
import PublicRoute from "./components/route_auth/PublicRoute";
import PrivateRoute from "./components/route_auth/PrivateRoute";
import DeleteUser from "./queries/DeleteUser";
import ConfirmEmail from "./components/user/ConfirmEmail";
import ChangePassword from "./components/user/ChangePassword";
import UploadSmartContract from "./components/home/uploadContract/UploadSmartContract";
import FAConfirmation from "./components/user/2FAConfirmation";
import UserAccount from "./components/user/myAccount/UserAccount";
import Admin from "./components/admin/Admin";
import NotFound from "./components/ui/NotFound";
import {connect} from "react-redux";
import {setUser} from "./actions/Actions";
import OrderContracts from "./components/user/dashboard/orderContract/OrderContracts";
import ExplorerResult from "./components/block_explorer/explorerSearch/ExplorerResult";
import EditSmartContract from "./components/home/uploadContract/editSmartContract/EditSmartContract";
import Compile from "./components/home/smartContract/Compile";
import {Query} from "react-apollo";
import {me_Query} from "./queries/queries";
import {Spinner} from "./components/ui/Spinner";
import UploadDapps from "./components/home/dapps/uploadDapps/uploadDapps";
import DappsDetails from "./components/home/dapps/detailDApps/DappsDetails";
import EditDapp from "./components/home/dapps/eidtDapp/EditDapp";
import DevelopedDapps from "./components/user/dashboard/developedDapps/DevelopedDapps";


const Routes =(props)=>{
     useEffect(()=>{
          const user=props.user;
          if (user!==null) {
               props.setUser(user);
          }
     })
     return (
         <Switch>

              <PrivateRoute {...props} path={"/dashboard/developed_contract"} exact component={DevelopedContracts}/>
              <PrivateRoute {...props} path={"/dashboard/ordered_contract"} exact component={OrderContracts}/>
              <PrivateRoute {...props} path={"/dashboard/test_contract"} exact component={TestContract}/>
              <PrivateRoute {...props} path={"/dashboard/developed_dapps"} exact component={DevelopedDapps}/>
              <PrivateRoute {...props} path={"/dashboard/purchased"} exact component={Purchased}/>
              <PrivateRoute {...props} path={"/account_settings"} component={UserAccount}/>
              <PrivateRoute {...props} path={'/upload_dapps'} component={UploadDapps}/>
              <PrivateRoute {...props} path={'/dapps_details/:id'} component={DappsDetails}/>
              <PrivateRoute {...props} path={'/edit_dapp/:id'} component={EditDapp}/>
              <PrivateRoute {...props} path={"/logout"} exact component={Logout}/>
              <PrivateRoute {...props} path={"/delete_user"} exact component={DeleteUser}/>
              <PrivateRoute {...props} path={"/edit_samrt_contract/:id"} exact component={EditSmartContract}/>
              <PrivateRoute {...props} path={"/compile/:id"} exact component={Compile}/>
              <PrivateRoute {...props} path={"/upload_samrt_contract"} exact component={UploadSmartContract}/>
              <PublicRoute {...props} restricted={false} path={"/2FA_varifivcation/:token"} exact component={FAConfirmation}/>
              <PublicRoute {...props} restricted={false} path={"/block_explorer/:search"} exact component={ExplorerResult}/>
              <PublicRoute {...props} restricted={false} path={"/user/reset-password/:key"} exact component={ChangePassword}/>
              <PublicRoute {...props} restricted={false} path={"/user/confirm/:key"} exact component={ConfirmEmail}/>
              <PublicRoute {...props} restricted={false} path={"/detailed_contract/:id"} exact component={DetailedContract}/>
              <PublicRoute {...props} restricted={false} path={"/search_result/:search"} exact component={SearchResult}/>
              <PublicRoute {...props} restricted={false} path={"/forget_password"} exact component={ResetPassword}/>
              <PublicRoute {...props} restricted={true} path={"/register"} exact component={Register}/>
              <PublicRoute {...props} restricted={true} path={"/login"} exact component={Login}/>
              <PublicRoute {...props} restricted={false} path={"/smart_contracts"} exact component={Smart_Contracts}/>
              <PublicRoute {...props} restricted={false} path={"/help"} exact component={Help}/>
              <PublicRoute {...props} restricted={false} path={"/downloads"} exact component={Downloads}/>
              <PublicRoute {...props} restricted={false} path={"/dapps"} exact component={Dapps}/>
              <PublicRoute {...props} restricted={false} path={"/block_explorer"} exact component={BlockExplorer}/>
              <PublicRoute {...props} restricted={false} path={"/about_us"} exact component={AboutUs}/>
              <PublicRoute {...props} restricted={false} path={"/"} exact component={Home}/>
              <PublicRoute {...props} restricted={false} component={NotFound}/>
         </Switch>
         );
}

export default connect(null, {setUser})  (Routes);
