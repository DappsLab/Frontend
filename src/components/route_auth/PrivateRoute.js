import React, {Component} from 'react';
import {Route,Redirect} from "react-router-dom";
import NotFound from "../ui/NotFound";
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import {meQuery} from "../../queries/queries";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";
import Spinner from "../ui/Spinner";


class PrivateRoute extends Component{
    handleRender(){
        const found=this.props.computedMatch.isExact;
        const auth=!!localStorage.getItem('token');
        const path=this.props.path;
        if (auth&&found) {
            if (this.props.logged_session){
                return <Route path={path} exact component={this.props.component}/>
            }else {
                if (this.props.data.me) {
                    const user = this.props.data.me;
                    this.props.setUser(user);
                    return <Route path={path} exact component={this.props.component}/>
                } else {
                    return <Route path={path} exact component={this.props.component}/>
                }
            }
        }else {
            if (found){
                return <Redirect to={'/login'}/>
            }else {
                return <Route component={NotFound}/>
            }
        }
    }
   render() {
       return this.props.data.loading?<Spinner/>:(
           this.handleRender()
       )
   }
}
const mapStateToProps=(state)=>({
    logged_session:state.user.logged_session,
})
export default compose(graphql(meQuery),connect(mapStateToProps, {setUser}))(PrivateRoute);