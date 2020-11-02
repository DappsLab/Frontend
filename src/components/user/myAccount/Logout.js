import React, {Component} from 'react';
import {clearUser} from "../../../actions/Actions";
import {connect} from  'react-redux';
import {Loader,Dimmer} from "semantic-ui-react";

import {withApollo,ApolloConsumer} from "react-apollo";
import {Redirect} from "react-router-dom";
import Layout from "../../../hoc/Layout";
import gql from "graphql-tag";


const logoutMutation=gql`
    mutation {logout}
`

class Logout extends Component {
      componentDidMount(){
        this.props.clearUser();
        localStorage.removeItem('token');
        this.props.history.push('/');
        window.location.reload();
    }
    render() {
        return (
            <Layout>
                <Dimmer active>
                    <Loader size={"huge"} content={"Logging you out "}/>
                </Dimmer>
            </Layout>
        );
    }
}

export default  connect(null,{clearUser})(Logout);