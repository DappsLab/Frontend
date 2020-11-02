import React, {Component} from 'react';
import Routes from "./routes";
import {meQuery} from "./queries/queries";
import {graphql } from "react-apollo";

import {flowRight as compose} from 'lodash';
import {connect} from "react-redux";
import {setUser} from "./actions/Actions";
import Spinner from "./components/ui/Spinner";


class App extends Component {
    state={
        user:true
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.token!=="Null"){
            if (this.props.data.me){
                let user = this.props.data.me;
                this.props.setUser(user);
            }
        }
    }

    render() {
        return this.props.data.loading?<Spinner/>:(
            <Routes user={this.props.token!=="Null"?this.state.user:false}/>
        );
    }
}

export default compose(graphql(meQuery),connect(null, {setUser}))(App);