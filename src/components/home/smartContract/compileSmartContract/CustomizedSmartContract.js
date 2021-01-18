import React, { useState} from 'react';
import "../../../../assets/scss/compile.css"
import {Button, Divider, Form, Item} from "semantic-ui-react";
import {flowRight as compose} from "lodash";
import {compile, licenseById, me_Query} from "../../../../queries/queries";
import {Spinner2} from "../../../ui/Spinner";
import { useMutation, useQuery} from "@apollo/client";
import {connect} from "react-redux";
import {setUser} from "../../../../actions/Actions";
import {withAlert} from "react-alert";
import {Client} from "../../../../queries/Services";

import CompileLayout from "../../../../hoc/CompileLayout";
const alphabet=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

const CustomizedSmartContract =(props)=> {
    const [license, setLicenses] = useState(null);
    const [name, setName] = useState("");
    const [Loading,setLoading]=useState(false);
    const alert = props.alert;

    const handleChange = (event) => {
        const {value} = event.target;
        if (alphabet.test(value)) {
            setName(value)
        }
        if (value === "") {
            setName(value)
        }
    }
    const [newCompile] = useMutation(compile, {
        client: Client,
        onCompleted: data => {
            if (data) {
                setLoading(false)
                props.history.push(`/compiled_smart_contract/${license.id}`)
            }
        },
        onError: error1 => {
            setLoading(false)
            alert.error(error1.toString(), {timeout: 2000})
        },
        refetchQueries: me_Query
    })
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
    const onCompiled = () => {
        setLoading(true)
        newCompile({
            variables: {
                name: name.toString(),
                sId: license.order.smartContract.id,
                pId: license.purchasedContract.id,
                lId: license.id
            },
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        }).catch(err => {
            console.log(err.toString())
        });
    }
    const RenderData = () => {
        const {error, loading, data} = useQuery(licenseById, {
            variables: {id: props.match.params.id},
            client: Client,
            onCompleted: data1 => {
                setLicenses(data1.licenseById)
                if (data1.licenseById.used){
                    props.history.push(`/compiled_smart_contract/${data1.licenseById.id}`)
                }
            }
        })
        if (loading) return <Spinner2/>
        if (Loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const liecense = data.licenseById;
            const contract = liecense.order.smartContract;
            return (
                <div className={"customize"}>
                    <h2>Customize your contract</h2>
                    <Divider/>
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
                                fluid onChange={(event) => handleChange(event)}
                                type={'text'} value={props.name}
                            />
                            <p>This will help you differentiate it between multiple compilation</p>
                        </Form.Field>
                    </Form>
                    <Button className={"compilebtn"} onClick={()=>onCompiled()}>Compile</Button>
                </div>
                // <CustomizedSmartContract
                //     change={(event) => handleChange(event)}
                //     name={name}
                //     contract={liecense.order.smartContract}
                //     onCompiled={() => OnComplied(liecense)}
                // />
            )
        }
        return <div>Not found Retry</div>
    }
    return (
        <CompileLayout type={'main'}>
            {RenderData()}
        </CompileLayout>
    )
}
export default compose(connect(null,{setUser}),withAlert())(CustomizedSmartContract);