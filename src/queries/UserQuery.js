import React, {Component} from 'react';
import {graphql } from "react-apollo";
import Spinner from "../components/ui/Spinner";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import {userData} from "./queries";


class UserQuery extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {close,getUserData}=this.props;
        if (this.props.data.error) {
            let Loginerror = this.props.data.error.message;
            close();
            getUserData(Loginerror)
        } else {
            let user = this.props.data.userById;

            close();
            getUserData("user",user);
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
                id:props.id
            }
        }
    }
})(UserQuery);
export default compose(withAlert(),)(BindData)