import React, {Component} from 'react';
import {clearUser} from "../../../actions/Actions";
import {connect} from  'react-redux';
import {Loader,Dimmer} from "semantic-ui-react";
import Layout from "../../../hoc/Layout";



class Logout extends Component {
    componentDidMount(){
        console.log("test")
        this.props.history.push('/');
        this.props.clearUser();
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

export default connect(null,{clearUser})(Logout);