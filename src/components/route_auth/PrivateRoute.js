// import React, {Component} from 'react';
// import {Route,Redirect} from "react-router-dom";
// import NotFound from "../ui/NotFound";
// import {flowRight as compose} from "lodash";
// import {connect} from "react-redux";
//
// class PrivateRoute extends Component{
//     handleRender(){
//         const found=this.props.computedMatch.isExact;
//         const auth=!!localStorage.getItem('token');
//         const path=this.props.path;
//         console.log(path,auth,found)
//         if (auth&&found&&this.props.logged_session) {
//             return <Route path={path} exact component={this.props.component}/>
//         }else {
//             if (found){
//                 return <Redirect to={'/login'}/>
//             }else {
//                 return <Route component={NotFound}/>
//             }
//         }
//     }
//     render() {
//         return (
//             this.handleRender()
//         )
//     }
// }
// const mapStateToProps=(state)=>({
//     logged_session:state.user.logged_session,
// })
// export default compose(connect(mapStateToProps))(PrivateRoute);
import React from 'react';
import {Route,Redirect} from "react-router-dom";

const PrivateRoute = ({user,component:Comp,...rest}) => {
    return <Route {...rest} component={(props)=>(
        !!localStorage.getItem('token') ?
           <Comp {...props} user={user}/>
            :
            <Redirect to="/login"/>
    )}/>
};

export default (PrivateRoute);