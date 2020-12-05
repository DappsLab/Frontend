import React, {Component} from 'react';
import "../../../assets/scss/explorer_content.css"
import {Form,Input,Icon} from "semantic-ui-react";

class ExplorerContract extends Component {
    handleClear=()=>{
        console.log("skdfm")
    }
    render() {
        return (
            <section className={"dappslab_banner explorer_content flex"}>
                <h1>Explore <span>Smart Contract</span></h1>
                <p>
                    Smart Contract available on dappslab market place suited to your business
                    growth and developers community explore !
                </p>
                <Form>
                   <Form.Field>
                    <Input
                        onKeyPress={(event=>this.props.onKeyUp(event))} value={this.props.value}
                        onChange={(event => this.props.change(event))} name="searchValue"
                        placeholder='Search...' />
                        <Icon
                            name='search' link circular
                            inverted onClick={this.props.onSearch}
                        />
                    </Form.Field>
                </Form>
            </section>
        );
    }
}

export default ExplorerContract;