import React, {useState} from 'react';
import {Switch,Route} from "react-router-dom";
import {connect} from "react-redux";

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
import Logout from "./components/user/myAccount/Logout";
import ResetPassword from "./components/login/ResetPassword";
import LoginUser from "./queries/LoginQuery";
import Purchased from "./components/user/dashboard/Purchased";
import TestContract from "./components/user/dashboard/TestContract";
import DevelopedContract from "./components/user/dashboard/DevelopedContract";
import NotFound from "./components/ui/NotFound";
import UserQuery from "./queries/UserQuery";
import Spinner from "./components/ui/Spinner";




const Routes =(props)=>{
        const [loading,setLoading]=useState(false);
        if (!props.currentUser){
                // console.log(props.currentUser)
                // console.log(window.location.pathname)
                setLoading(true);
        }
        return  (
            <Switch>
                <Route  path={"/dashboard/developed_contract"} exact component={DevelopedContract}/>
                <Route  path={"/dashboard/test_contract"} exact component={TestContract}/>
                <Route  path={"/dashboard/purchased"} exact component={Purchased}/>
                <Route  path={"/account/profile/2fa"} exact component={TwoFA}/>
                <Route  path={"/account/profile/transactions"} exact component={Transactions}/>
                <Route path={"/account/profile/wallet"} exact component={WithdrawDeposite}/>
                <Route  path={"/account/profile"} exact component={GeneralSetting}/>
                <Route  path={"/logout"} exact component={Logout}/>

                <Route  path={"/LoginQ"} exact component={LoginUser}/>
                <Route  path={"/UserQ"} exact component={UserQuery}/>

                <Route  path={"/upload_samrt_contract/general_info"} exact component={GeneralInfo}/>
                <Route  path={"/upload_samrt_contract/associated_files"} exact component={AssociatedFiles}/>
                <Route  path={"/detailed_contract/:id"} exact component={DetailedContract}/>
                <Route  path={"/search_result"} exact component={SearchResult}/>
                <Route  path={"/forget_password"} exact component={ResetPassword}/>
                <Route  path={"/register"} exact component={Register}/>
                <Route  path={"/login"} exact component={Login}/>
                <Route  path={"/smart_contracts"} exact component={Smart_Contracts}/>
                <Route path={"/help"} exact component={Help}/>
                <Route  path={"/downloads"} exact component={Downloads}/>
                <Route  path={"/dapps"} exact component={Dapps}/>
                <Route  path={"/block_explorer"} exact component={BlockExplorer}/>
                <Route  path={"/about_us"} exact component={AboutUs}/>
                <Route  path={"/"} exact component={Home}/>
                <Route  component={NotFound}/>
            </Switch>
        );
}
const mapStateToProps=(state)=>({
        currentUser:state.user.logged_session
});

export default connect(mapStateToProps) (Routes);
