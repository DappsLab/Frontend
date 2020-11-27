import React, {Component} from 'react';
import Routes from "./routes";
import {connect} from "react-redux";
import {setUser} from "./actions/Actions";

class App extends Component {
    componentDidMount(){
        const user=this.props.user;
        if (user!==null) {
            this.props.setUser(user);
        }
    }
    render() {
        return (
            <Routes {...this.props}/>
        );
    }
}

export default connect(null, {setUser})(App);