import React from 'react';
import {Switch} from "react-router-dom";
import {connect} from "react-redux";
import {flowRight as compose} from 'lodash';

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





const Routes =(props)=>{
        return  (
            <Switch>
                <PrivateRoute auth={props.currentUser}  path={"/dashboard/developed_contract"}  component={DevelopedContract}/>
                <PrivateRoute auth={props.currentUser}  path={"/dashboard/test_contract"}  component={TestContract}/>
                <PrivateRoute auth={props.currentUser}  path={"/dashboard/purchased"}  component={Purchased}/>
                <PrivateRoute auth={props.currentUser}  path={"/account/profile/2fa"}  component={TwoFA}/>
                <PrivateRoute auth={props.currentUser}  path={"/account/profile/transactions"}  component={Transactions}/>
                <PrivateRoute auth={props.currentUser}  path={"/account/profile/wallet"}  component={WithdrawDeposite}/>
                <PrivateRoute auth={props.currentUser}  path={"/account/profile"}  component={GeneralSetting}/>
                <PrivateRoute auth={props.currentUser}  path={"/logout"}  component={Logout}/>
                <PublicRoute   path={"/upload_samrt_contract/general_info"}  component={GeneralInfo}/>
                <PublicRoute  path={"/upload_samrt_contract/associated_files"}  component={AssociatedFiles}/>
                <PrivateRoute auth={props.currentUser} path={"/delete_user"} component={DeleteUser}/>

                <PublicRoute  path={"/LoginQ"}  component={LoginUser}/>
                <PublicRoute  path={"/UserQ"}  component={UserQuery}/>


                <PublicRoute path={"/user/reset-password/:key"} component={ChangePassword}/>
                <PublicRoute path={"/user/confirm/:key"} component={ConfirmEmail}/>
                <PublicRoute  path={"/detailed_contract/:id"}  component={DetailedContract}/>
                <PublicRoute  path={"/search_result"}  component={SearchResult}/>
                <PublicRoute  path={"/forget_password"}  component={ResetPassword}/>
                <PublicRoute  path={"/register"}  component={Register}/>
                <PublicRoute  path={"/login"}  component={Login}/>
                <PublicRoute  path={"/smart_contracts"}  component={Smart_Contracts}/>
                <PublicRoute path={"/help"}  component={Help}/>
                <PublicRoute  path={"/downloads"}  component={Downloads}/>
                <PublicRoute  path={"/dapps"}  component={Dapps}/>
                <PublicRoute  path={"/block_explorer"}  component={BlockExplorer}/>
                <PublicRoute  path={"/about_us"}  component={AboutUs}/>
                <PublicRoute  path={"/"}  component={Home}/>
                {/*<PublicRoute  component={NotFound}/>*/}

            </Switch>
        );
}
const mapStateToProps=(state)=>({
        currentUser:state.user.logged_session
});

export default compose(
    connect(mapStateToProps)
) (Routes);
