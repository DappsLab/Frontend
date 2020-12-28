import React, {useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {testCompile, testLicenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Button, Divider, Form, Item, Segment} from "semantic-ui-react";
import CompileLayout from "../../../../hoc/CompileLayout";
import {categoryColors} from "../../../ui/Helpers";
import {withAlert} from "react-alert";

const TestCustomizeSmartContract = (props) => {
    const [name,setName]=useState('');
    const [Loading,setLoading]=useState(false);
    const [licenses, setLicenses] = useState(null);
    const {alert}=props
    const [test_compile]=useMutation(testCompile,{
        client:Client,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },onCompleted:data => {
            setLoading(false);
             props.history.push(`/compiled_test_smart_contract/${licenses.id}`)
        },onError:error => {
            setLoading(false);
            alert.error(error.toString(),{timeout:5000})
        }
    })
    const Compile=()=>{
        setLoading(true)
        console.log('nam')
        test_compile({
            variables:{
                name:name,
                sid:licenses.testOrder.smartContract.id,
                pid:licenses.testPurchasedContract.id ,
                lid:props.match.params.id,
            }
        }).catch(err=>{
            console.log(err.toString())
        })
    }
    const RenderData = () => {
        const {error, loading, data} = useQuery(testLicenseById, {
            variables: {id: props.match.params.id},
            fetchPolicy:'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },
            onCompleted: data1 => {
                setLicenses(data1.testLicenseById)
                if (data1.testLicenseById.used){
                    props.history.push(`/compiled_test_smart_contract/${data1.testLicenseById.id}`)
                }
            }
        })
        if (loading) return  <Spinner2/>
        if (Loading) return  <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const license = data.testLicenseById
            const contract=license.testOrder.smartContract;
            return <div className={"customize"}>
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
                        <Button onClick={()=>Compile()} className={"compilebtn"}>Compile</Button>
                    </div>
                }
            </div>
        }
        return <div>Not found Retry</div>
    }
    return (
        <CompileLayout type={'test'}>
            {RenderData()}
        </CompileLayout>
    )
}

export default withAlert() (TestCustomizeSmartContract);