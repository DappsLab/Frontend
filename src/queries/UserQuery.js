import React, {Component} from 'react';
import {graphql } from "react-apollo";
import Spinner from "../components/ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../actions/Actions";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import {userData} from "./queries";


class UserQuery extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.error) {
            let Loginerror = this.props.data.error.message;
            this.props.history.push({pathname: '/login', state: {Loginerror}});
        } else {
            let user = this.props.data.userById;
            this.props.setUser(user);
            const alert = this.props.alert;
            alert.success("Login Successfully", {timeout: 2000});
            this.props.history.push('/');
        }
    }
    render() {
        return this.props.data.loading? <Spinner/>:(
            <div> </div>
        );
    }
}
const BindData= graphql(userData, {
    options: (props) => {
        return {
            variables: {
                id:props.location.state.user.user.id
            }
        }
    }
})(UserQuery);
export default compose(
    connect(null, {setUser}),withAlert(),
)(BindData)