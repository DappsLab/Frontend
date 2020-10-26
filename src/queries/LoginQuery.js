import React, {Component} from 'react';
import gql from 'graphql-tag'
import {graphql } from "react-apollo";
import Spinner from "../components/ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../actions/Actions";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';

//Query
const userLogin=gql`
    query ($username:String!,$password:String!){
        loginUser(userName: $username, password: $password) {
            token
            user {
                id 
            }
        }
    }
`
class LoginQuery extends Component{
   componentDidUpdate(prevProps, prevState, snapshot) {
           if (this.props.data.error) {
               let Loginerror = this.props.data.error.message;
               this.props.history.push({pathname: '/login', state: {Loginerror}});
           } else {
               let user = this.props.data.loginUser;
               localStorage.setItem('token',user.token);
               this.props.history.push({pathname:'/UserQ',state:{user}});
           }
       }
    render() {
        return this.props.data.loading? <Spinner/>:(
            <div> </div>
        );
    }
}
const BindData= graphql(userLogin, {
    options: (props) => {
        return {
            variables: {
                username:props.location.state.username ,
                password: props.location.state.password
            }
        }
    }
})(LoginQuery);
export default compose(
    connect(null, {setUser}),withAlert(),
)(BindData)