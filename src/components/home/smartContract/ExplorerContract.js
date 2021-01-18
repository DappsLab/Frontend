import React from 'react';
import "../../../assets/scss/explorer_content.css"
import {Form,Input,Icon} from "semantic-ui-react";

const ExplorerContract =(props)=>{
    return (
        <section className={"dappslab_banner explorer_content flex"}>
            <h1>Explore <span>{props.type==="dapps"?" Dapps ":" Smart Contract"}</span></h1>
            <p>
                {props.type==="dapps"?" Dapps ":" Smart Contract "} available on dappslab market place suited to your business
                growth and developers community explore !
            </p>
            <Form>
                <Form.Field>
                    <Input
                        onKeyPress={props.type==="dapps"?(event)=>props.onKeyUp(event):(event)=>props.onKeyUp(event)}
                        value={props.type==="dapps"?props.value:props.value}
                        onChange={props.type==="dapps"?(event)=>props.change(event):(event)=>props.change(event)} name="searchValue"
                        placeholder='Search...' />
                        <Icon
                            name='search' link circular
                            inverted onClick={props.onSearch}
                        />
                </Form.Field>
            </Form>
        </section>
    );
}

export default ExplorerContract;