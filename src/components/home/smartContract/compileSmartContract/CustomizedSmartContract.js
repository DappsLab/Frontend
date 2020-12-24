import React from 'react';
import {Button, Divider, Form, Item} from "semantic-ui-react";

const CustomizedSmartContract = (props) => {
    const contract=props.contract;
    const returnColor=(color)=>{
        switch (color){
            case "TOOLS":
                return "orange";
            case "SOCIAl":
                return "grey";
            case "DOCUMENTS":
                return "teal";
            case "UTILITY":
                return "purple";
            case "ESCROW":
                return "blue";
            case "FINANCIAL":
                return "green";
            default:
                return "violet";
        }
    }
    return (
        <div className={"customize"}>
            <h2>Customize your contract</h2>
            <Divider/>
            <Item.Group>
                <Item>
                    <Item.Image src={contract.image}/>
                    <Item.Content>
                        <Item.Header>{contract.contractName}</Item.Header>
                        <Item.Meta >
                            <span>Published By</span>
                            <span>{contract.publisher.fullName}</span>
                            <span>|{contract.publishingDateTime}</span>
                        </Item.Meta>
                        <Item.Description>
                            {contract.shortDescription}
                        </Item.Description>
                        <Item.Extra>
                            <div className={"contract_category"}>
                                {contract.contractCategory.map((category, index) => {
                                    return <Button
                                        disabled  size={"mini"}
                                        color={returnColor(category)} key={category}>
                                        {category}
                                    </Button>
                                })
                                }
                            </div>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
            <Divider/>
            <Form>
                <Form.Field>
                    <label>Name of this compilation</label>
                    <Form.Input
                        fluid onChange={(event)=>props.change(event)}
                        type={'text'} value={props.name}
                    />
                    <p>This will help you differentiate it between multiple compilation</p>
                </Form.Field>
            </Form>
            <Button  className={"compilebtn"} onClick={props.onCompiled}>Compile</Button>
        </div>
    )
};

export default CustomizedSmartContract;