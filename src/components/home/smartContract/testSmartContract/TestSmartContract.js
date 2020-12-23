import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {testLicenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Container, Segment} from "semantic-ui-react";
import TestCustomized from "./TestCustomized";
import TestCompileResult from "./TestCompileResult";
import TestDeploy from "./testDeploy/TestDeploy";

const TestSmartContract = (props) => {
    const [active, setActive] = useState("customize");
    const [licenses, setLicenses] = useState(null);
    const handleTab = (data, id) => {
        setActive(data);
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
                if (data1.testLicenseById.used) {
                    setActive('compile')
                }
                setLicenses(data1.testLicenseById)
            }
        })
        if (loading) return  <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const license = data.testLicenseById
            return (active === "customize" ?
                <TestCustomized
                    changeTab={(data) => handleTab(data)}
                        license={license}  id={props.match.params.id}
                    />
                    : (active === "compile" ?
                        <TestCompileResult id={props.match.params.id} changeTab={(data) => handleTab(data)}/> :
                        <TestDeploy id={props.match.params.id}/>)
            );
        }
        return <div>Not found Retry</div>
    }
    return (
        <Layout>
            <Container fluid className={"compile flex"}>
                <Segment className={"compile_left"}>
                    <div className={`sub_tab ${active === "customize" && "blue_background"}`}>
                        <div className={"tab_number"}>2</div>
                        <div>
                            <h3>Customize</h3>
                            <span>Insert your own parameter</span>
                        </div>
                    </div>
                    <div className={`sub_tab ${active === "compile" && "blue_background"}`}>
                        <div className={"tab_number"}>2</div>
                        <div>
                            <h3>Compile</h3>
                            <span>Create the customized contract</span>
                        </div>
                    </div>
                    <div className={`sub_tab ${active === "deploy" && "blue_background"}`}>
                        <div className={"tab_number"}>{3}</div>
                        <div>
                            <h3>Deploy</h3>
                            <span>Deploy your contract on the network</span>
                        </div>
                    </div>
                </Segment>
                <Segment className={"compile_right"}>
                    {RenderData()}
                </Segment>
            </Container>
        </Layout>
    )
}

export default TestSmartContract;