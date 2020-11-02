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
import GeneralSetting from "./components/user/myAccount/GeneralSetting";
import WithdrawDeposite from "./components/user/myAccount/WithdrawDeposite";
import Transactions from "./components/user/myAccount/Transactions";
import TwoFA from "./components/user/myAccount/TwoFA";
import GeneralInfo from "./components/home/uploadContract/GeneralInfo";
import AssociatedFiles from "./components/home/uploadContract/AssociatedFiles";
import Logout from "./components/user/myAccount/Logout";
import ResetPassword from "./components/login/ResetPassword";
import LoginUser from "./queries/LoginQuery";
import Purchased from "./components/user/dashboard/Purchased";
import TestContract from "./components/user/dashboard/TestContract";
import DevelopedContract from "./components/user/dashboard/DevelopedContract";
import UserQuery from "./queries/UserQuery";
import PublicRoute from "./components/route_auth/PublicRoute";
import PrivateRoute from "./components/route_auth/PrivateRoute";
import DeleteUser from "./queries/DeleteUser";
import ConfirmEmail from "./components/user/ConfirmEmail";
import ChangePassword from "./components/user/ChangePassword";
import Spinner from "./components/ui/Spinner";
import {setUser} from "./actions/Actions";


class Routes extends Component{
     state={
        user:this.props.user,
        loading:true
     }
     componentDidMount() {
        this.setState({user:this.props.user,loading:false})
             console.log(this.props)
     }
     render() {
         const {user}=this.state;
         return this.state.loading ? <Spinner/> : (
         <Switch>
              <PrivateRoute auth={user} path={"/dashboard/developed_contract"} component={DevelopedContract}/>
              <PrivateRoute auth={user} path={"/dashboard/test_contract"} component={TestContract}/>
              <PrivateRoute auth={user} path={"/dashboard/purchased"} component={Purchased}/>
              <PrivateRoute auth={user} path={"/account/profile/2fa"} component={TwoFA}/>
              <PrivateRoute auth={user} path={"/account/profile/transactions"} component={Transactions}/>
              <PrivateRoute auth={user} path={"/account/profile/wallet"} component={WithdrawDeposite}/>
              <PrivateRoute auth={user} path={"/account/profile"}  component={GeneralSetting}/>
              <PrivateRoute auth={user} path={"/logout"} component={Logout}/>
              <PrivateRoute auth={user} path={"/delete_user"} component={DeleteUser}/>

              <PrivateRoute auth={user} path={"/upload_samrt_contract/general_info"} component={GeneralInfo}/>
              <PrivateRoute auth={user} path={"/upload_samrt_contract/associated_files"} component={AssociatedFiles}/>

              <PublicRoute auth={user} path={"/user/reset-password/:key"} component={ChangePassword}/>
              <PublicRoute auth={user} path={"/user/confirm/:key"} component={ConfirmEmail}/>
              <PublicRoute auth={user} path={"/detailed_contract/:id"} component={DetailedContract}/>
              <PublicRoute auth={user} path={"/search_result"} component={SearchResult}/>
              <PublicRoute auth={user} path={"/forget_password"} component={ResetPassword}/>
              <PublicRoute auth={user} path={"/register"} component={Register}/>
              <PublicRoute auth={user} path={"/login"} component={Login}/>
              <PublicRoute auth={user} path={"/smart_contracts"} component={Smart_Contracts}/>
              <PublicRoute auth={user} path={"/help"} component={Help}/>
              <PublicRoute auth={user} path={"/downloads"} component={Downloads}/>
              <PublicRoute auth={user} path={"/dapps"} component={Dapps}/>
              <PublicRoute auth={user} path={"/block_explorer"} component={BlockExplorer}/>
              <PublicRoute auth={user} path={"/about_us"} component={AboutUs}/>
              <PublicRoute auth={user} path={"/"} component={Home}/>
              {/*<PublicRoute  component={NotFound}/>*/}
         </Switch>
         );
     }
}

export default  (Routes);
