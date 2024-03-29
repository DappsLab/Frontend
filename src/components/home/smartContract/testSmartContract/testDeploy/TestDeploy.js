import React, {useState} from 'react';
import {useQuery} from "@apollo/client";
import {testLicenseById} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";
import {Form, Input} from "semantic-ui-react";
import {Slider} from "react-semantic-ui-range";
import {feeProcessTime} from "../../../../ui/Helpers";
import RenderArguments from "./RenderArguments";
import CompileLayout from "../../../../../hoc/CompileLayout";

const TestDeploy = (props) => {
    const [fee, setFee] = useState(100000);
    const [name, setName] = useState('');
    // const [abi,setABI]=useState(TestABI)
    // console.log(abi)
    const id = props.match.params.id

    const RenderData=()=> {
        const {error, loading, data} = useQuery(testLicenseById, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },onError:error=>{
                console.log(error.toString())
            },onCompleted:data1 => {
                const license=data1.testLicenseById
                const used=license.testCompilations[license.testCompilations.length - 1].used
                if (used){
                    props.history.push(`/interact_test_smart_contract/${data1.testLicenseById.id}`)
                }
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const license = data.testLicenseById;
            return (
                <div className={'test_deploy'}>
                    <h2>Deploy</h2>
                    <Form>
                        <Form.Field>
                            <label>Label Name</label>
                            <Input
                                fluid size={'large'} value={name}
                                onChange={(event, {name, value}) => {
                                    setName(value)
                                }}
                            />
                        </Form.Field>
                        <Form.Field className={"slider flex"}>
                            <label>Set fee</label>
                            <Form.Group>
                                <Slider
                                    color="green" inverted={false}
                                    settings={{
                                        start: 100000,
                                        min: 30000,
                                        max: 999999,
                                        step: 200,
                                        onChange: value => {
                                            setFee(value);
                                        }
                                    }}
                                />
                                <p>This is the most amount of money that might be used to process this
                                    transaction. Your transaction will be processed in the
                                    <span>{feeProcessTime(fee)}</span>
                                </p>
                            </Form.Group>
                        </Form.Field>
                        <Form.Field>
                            <label>Fee</label>
                            <Input
                                fluid size={'large'} value={fee}
                                disabled label={{basic: true, content: 'Wei'}}
                            />
                        </Form.Field>
                    </Form>
                    <RenderArguments {...props} fee={fee}  name={name} license={license}/>
                </div>
            );
        }
        return <div>Error</div>
    }
    return (
        <CompileLayout type={'test'}>
            {RenderData()}
        </CompileLayout>
    )
};

export default TestDeploy;