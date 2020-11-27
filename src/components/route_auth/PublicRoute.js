import React, {Component} from 'react';
// import {Route,Redirect } from "react-router-dom";
// import NotFound from "../ui/NotFound";
// import {flowRight as compose} from "lodash";
// import {connect} from "react-redux";
//
// class PublicRoute extends Component{
//     handleRender(){
//         const found=this.props.computedMatch.isExact;
//         const auth=!!localStorage.getItem('token');
//         const path=this.props.path;
//         console.log(path,auth,found)
//         if (found) {
//             if (auth&&this.props.logged_session){
//                 if (path === '/login' || path === '/register') {
//                     return <Redirect to={'/'}/>
//                 }else if(path==='/2FA_varifivcation'){
//                     return <Route path={path} exact component={this.props.component}/>
//                 }else {
//                     return <Route path={path} exact component={this.props.component}/>
//                 }
//             }else {
//                 return <Route path={path} exact component={this.props.component}/>
//             }
//         }else {
//             return <Route component={NotFound}/>
//         }
//     }
//     render() {
//         return(
//             this.handleRender()
//         )
//     }
// }
// const mapStateToProps=(state)=>({
//     logged_session:state.user.logged_session,
// })
// export default compose(connect(mapStateToProps))(PublicRoute);

import {Route,Redirect} from "react-router-dom";


const PublicRoute = ({user,component:Comp,...rest}) => {
    return <Route {...rest} component={(props)=>(
        rest.restricted ?
            (!!localStorage.getItem('token')  ?
                     <Redirect to={"/"}/>
                    :
                    <Comp {...props} user={user}/>
            )
            :
            <Comp {...props} user={user}/>
    )}/>
};

export default PublicRoute;