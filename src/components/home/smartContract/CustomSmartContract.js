import React, {Component} from 'react';
import {Button} from "semantic-ui-react";
import '../../../assets/scss/custom_smart_contract.css'

class CustomSmartContract extends Component {
    render() {
        return (
            <section className={'custom_section'}>
                <h2>Custom <span>Smart Contract</span></h2>
                <p> If you don't find what you need on our Marketplace you can submit a
                    bounty to be solved by the devs community.</p>
                <Button>Order Now</Button>
            </section>
        );
    }
}

export default CustomSmartContract;