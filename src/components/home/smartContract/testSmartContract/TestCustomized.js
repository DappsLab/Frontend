import React, {useState} from 'react';
import {Button, Divider, Form, Item} from "semantic-ui-react";
import {categoryColors} from "../../../ui/Helpers";
import {useMutation} from "@apollo/client";
import {testCompile} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {withAlert} from "react-alert";
import {Spinner2} from "../../../ui/Spinner";

const TestCustomized = (props) => {
    const [name,setName]=useState('');
    const [loading,setLoading]=useState(false);
    const {license,alert,changeTab}=props
    console.log(license)
    const contract=license.testOrder.smartContract;

    const [test_compile]=useMutation(testCompile,{
        client:Client,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onCompleted:data => {
            setLoading(false)
            props.changeTab('compile');
        },onError:error => {
            setLoading(false)
            alert.error(error.toString(),{timeout:5000})
        }
    })
    const Compile=()=>{
        setLoading(true)
        test_compile({
            variables:{
                name:name,
                sid:contract.id,
                pid:license.testPurchasedContract.id ,
                lid:props.id,
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }

    return (
        <div className={"customize"}>
            <h2>Customize your contract</h2>
            <Divider/>
            {loading ? <Spinner2/> :
                <div>
                    <Item.Group>
                        <Item>
                            <Item.Image src={contract.image}/>
                            <Item.Content>
                                <Item.Header>{contract.contractName}</Item.Header>
                                <Item.Meta>
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
                                                disabled size={"mini"}
                                                style={{backgroundColor: categoryColors(category), color: "#fff"}}
                                                key={category}>
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
                                fluid type={'text'} value={name} onChange={(event => {
                                setName(event.target.value)
                            })}
                            />
                            <p>This will help you differentiate it between multiple compilation</p>
                        </Form.Field>
                    </Form>
                    <Button onClick={Compile} className={"compilebtn"}>Compile</Button>
                </div>
            }
        </div>
    );
};

export default withAlert()(TestCustomized);