import React, {Component} from 'react';
import {Container, Icon} from "semantic-ui-react";

class Financial extends Component {
    render() {
        return (
            <section>
               <h2>Financial</h2>
                <Container fluid className={"finanaial"}>
                    <div className={"flex"}>
                        <Icon size='big' name={'ethereum'}/>
                        <div>
                            <h3>ETH Balance</h3>
                            <p>You need ETH to pay for gas when interacting with contracts</p>
                        </div>
                    </div>
                    <div className={"balance"}>{this.props.currentUser.balance} Eth</div>
                </Container>
            </section>
        );
    }
}

export default Financial;