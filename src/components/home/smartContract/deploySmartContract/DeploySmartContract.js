import React, {useState} from "react";
import CompileLayout from "../../../../hoc/CompileLayout";
import {useQuery} from "@apollo/client";
import {licenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Form, Input} from "semantic-ui-react";
import {Slider} from "react-semantic-ui-range";
import {feeProcessTime} from "../../../ui/Helpers";
import RenderArguments from "../testSmartContract/testDeploy/RenderArguments";
import RenderMainArguments from "./RenderMainArguments";


const DeploySmartContract = (props) => {
    const [fee, setFee] = useState(100000);
    const [name, setName] = useState('');
    const id = props.match.params.id

    const RenderData=()=> {
        const {error, loading, data} = useQuery(licenseById, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },
            onCompleted: data1 => {
                console.log(data1.licenseById)
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const license = data.licenseById;
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
                        <RenderMainArguments fee={fee} name={name} license={license}/>
                    </Form>
                </div>
            );
        }
        return <div>Error</div>
    }
    return (
        <CompileLayout type={'main'}>
            {RenderData()}
        </CompileLayout>
    )
};

export default DeploySmartContract;