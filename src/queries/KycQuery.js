import React, {Component} from 'react';
import {flowRight as compose} from 'lodash';
import {graphql} from "react-apollo";
import {UserKyc} from "./queries";
import {withAlert} from "react-alert";


class KycQuery extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data.error) {
            this.props.close();
        } else {
            this.props.close();
            this.props.getUserData(this.props.data.userById)
        }
    }
    render() {
        console.log(this.props)
        return (<div> </div>);
    }
}

export default compose(graphql(UserKyc,{
    options: (props) => {
        return {
            variables: {
                id:props.id
            }
        }
    }
} ),withAlert(),)(KycQuery);