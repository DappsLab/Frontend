import React, {Component} from 'react';
import {graphql } from "react-apollo";
import Spinner from "../components/ui/Spinner";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import { verify2FA} from "./queries";


class TwoFAQuery extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
    const alert=this.props.alert;
            if (this.props.data.verify2FA) {
                alert.success("Login Successfully", {timeout:5000})
                console.log("try")
                this.props.action(true);
                this.props.close();
            } else {
               alert.error("Try again", {timeout:1000})
                this.props.close();
               this.props.action(false)
            }
    }
    render() {
        return this.props.data.loading?<Spinner/>:(<div> </div>);
    }
}

export default compose(graphql(verify2FA,{
    options: (props) => {
        return {
            variables: {
                token:props.token
            }
        }
    }
} ),withAlert(),)(TwoFAQuery)
