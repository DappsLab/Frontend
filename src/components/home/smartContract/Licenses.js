import React, {Component} from 'react';
import "../../../assets/scss/licenses.css"
import {Container, Grid, Header, Icon, Segment} from "semantic-ui-react";

class Licenses extends Component {
    state={
        licenses:this.props.purchased.licenses,
        orders:this.props.currentUser.orders,
        purchased:this.props.purchased,
        showLicenses:this.props.showLicenses
    }
    render() {
        const {licenses,orders,purchased,showLicenses}=this.state;
        return (
            licenses.map(license=>{
                return <div className={"licenses flex"} key={license.purchaseDateTime}>
                    <Icon circular inverted color='blue'  name={'checkmark'}/>
                    <Segment>
                        <h2>Single Use License</h2>
                    </Segment>
                </div>
            })
        );
    }
}

export default Licenses;