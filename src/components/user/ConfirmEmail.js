import React, {Component} from 'react';
import {confirmEmail} from "../../queries/queries";
import {graphql} from "react-apollo";
import {Button} from "@material-ui/core";
import {Grid,Divider, Segment} from "semantic-ui-react";
import Spinner from "../ui/Spinner";
import {withAlert} from "react-alert";
import {flowRight as compose} from 'lodash';
import {DappsIcon} from "../ui/Icons";
import "../../assets/scss/confirm_email.css"

class ConfirmEmail extends Component {
    state={
        token:"",
        loading:false,
    }
    componentDidMount() {
        const token=this.props.match.params.key;
        this.setState({token:token},()=>{})
    }

    handleConfirm=()=>{
        const that=this;
        this.setState({loading:true})
        this.props.mutate({
            variables:{token:this.state.token}
        }).then(function(result) {
            if (result.data.confirmEmail) {
                that.setState({loading: false});
                that.props.history.push('/login');
                const alert = that.props.alert;
                alert.success("Email varified Successfully", {timeout: 5000});
            }else {
                console.log(result)
                that.setState({loading: false});
            }
        }).catch(e=>{
            that.setState({loading:false});
            that.props.history.push('/login');
            const alert = that.props.alert;
            alert.error(e.toString(), {timeout: 10000});
        });
    }
    render() {
        // console.log(this.props)
        return (
            <div>
            <Grid textAlign="center"  verticalAlign='middle' >
                <Grid.Column style={{maxWidth:600}}>
                    <Segment  className={"confirm_email"}>
                        <DappsIcon
                            link={false}
                            linkTo="/"
                        />
                        <h1>Welcome in DappsLab</h1>
                        <p>Woweee! Thanks for registering an account with DappsLab. Before we get started, we'll need
                            to verify your email. Simply click button below to varify your email address</p>
                    <Button  onClick={this.handleConfirm}
                            variant="contained" color="primary">
                        Varify email address
                    </Button>

                    </Segment>
                </Grid.Column>
            </Grid>
                 {this.state.loading&&<Spinner/>}
            </div>
        );
    }
}

export default compose(graphql(confirmEmail),withAlert()) (ConfirmEmail);