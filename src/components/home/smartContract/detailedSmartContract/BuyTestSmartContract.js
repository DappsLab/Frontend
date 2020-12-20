import React from 'react';
import {Button} from "semantic-ui-react";

const BuyTestSmartContract = (props) => {
    return (
        <Button fluid onClick={()=>{props.history.push(`/test_smart_contract/${this.props.match.params.id}`)}} className={"testbtn"}>Test contract</Button>
    );
};

export default BuyTestSmartContract;