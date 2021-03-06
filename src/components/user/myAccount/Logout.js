import React, {Component} from 'react';
import {clearUser} from "../../../reducer/user/user.actions";
import {connect} from  'react-redux';
import {Loader,Dimmer} from "semantic-ui-react";


class Logout extends Component {
      componentDidMount(){
          console.log("here")
          this.props.clearUser();
          localStorage.removeItem('token');
          this.props.history.push('/');
          console.log(this.props)
        window.location.reload();
    }
    render() {
        return (
            <Dimmer active>
                <Loader size={"huge"} content={"Logging you out "}/>
            </Dimmer>
        );
    }
}

export default  connect(null,{clearUser})(Logout);