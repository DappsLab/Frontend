import React, {Component} from 'react';
import {graphql } from "react-apollo";
import {Spinner} from "../components/ui/Spinner";
import {flowRight as compose} from 'lodash';
import {deleteUser} from "./queries";


class DeleteUser extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.result.error) {
            let Loginerror = this.props.data.error.message;
            console.log(Loginerror)
            // this.props.history.push({pathname: '/login', state: {Loginerror}});
        } else {
           console.log(this.props)
        }
    }
    render() {
    console.log(this.props)
        return this.props.result.loading?<Spinner/>:(
            <div> </div>
        );
    }
}

export default compose(
    graphql(deleteUser, {
        options: (props) => {
            return {
                variables: {
                    id:props.location.state.id
                }
            }
        }
    })
)(DeleteUser)