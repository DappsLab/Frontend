import React, {Component} from 'react';
import {confirmEmail} from "../../queries/queries";
import {graphql} from "react-apollo";
import {Button} from "@material-ui/core";
import {Grid, Segment} from "semantic-ui-react";
import Spinner from "../ui/Spinner";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';


class ConfirmEmail extends Component {
    state={
        token:"",
        loading:false,
    }
    componentDidMount() {
        const token=this.props.match.params.key;
        this.setState({token:token},()=>console.log(this.state))
    }

    handleConfirm=()=>{
        const that=this;
        this.setState({loading:true})
        this.props.mutate({
            variables:{token:this.state.token}
        }).then(function(result) {
            if (result.data.confirmEmail){
                that.setState({loading:false});
                that.props.history.push('/login');
                const alert = that.props.alert;
                alert.success("Email varified Successfully", {timeout: 5000});
            }else {
                that.setState({loading:false});
                that.props.history.push('/login');
                const alert = that.props.alert;
                alert.error("Email Not Varified", {timeout: 10000});
            }
        });
    }
    render() {
        // console.log(this.props)
        return (
            <Grid textAlign="center"  verticalAlign='middle' >
                <Grid.Column style={{maxWidth:500}}>
                    <Segment size={"massive"}>
                        <h3>Click on confirm button</h3>
                    <Button className={"confirm_email"} onClick={this.handleConfirm}
                            variant="contained" color="primary">
                        confirm
                    </Button>
                    </Segment>
                </Grid.Column>
                {this.state.loading&&
                    <Spinner/>
                }
            </Grid>
        );
    }
}

export default compose(graphql(confirmEmail),withAlert()) (ConfirmEmail);