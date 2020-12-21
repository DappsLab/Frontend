import React, {useState} from 'react';
import Layout from "../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {testLicenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Container, Segment} from "semantic-ui-react";
import TestCustomized from "./TestCustomized";
import TestCompileResult from "./TestCompileResult";
import TestDeploy from "./TestDeploy";

const TestSmartContract = (props) => {
    const [active,setActive]=useState("customize");
    const [licenses,setLicenses]=useState(null);

    const handleTab=(data)=>{
        setActive(data);
    }
    const {error, loading, data} = useQuery(testLicenseById, {
        variables: {id: props.match.params.id},
        client: Client,context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },
        onCompleted: data1 => {
            setLicenses(data1.licenseById)
        }
    })
    if (loading) return <Layout> <Spinner2/></Layout>
    if (error) return <div>{error.toString()}</div>
    if (data){
        const license=data.testLicenseById
        return (
            <Layout>
                <Container fluid className={"compile flex"}>
                    <Segment className={"compile_left"}>
                        <div className={`sub_tab ${active==="customize"&&"blue_background"}`}>
                            <div className={"tab_number"} >2</div>
                            <div>
                                <h3>Customize</h3>
                                <span>Insert your own parameter</span>
                            </div>
                        </div>
                        <div className={`sub_tab ${active==="compile"&&"blue_background"}`} >
                            <div className={"tab_number"} >2</div>
                            <div>
                                <h3>Compile</h3>
                                <span>Create the customized contract</span>
                            </div>
                        </div>
                        <div className={`sub_tab ${active==="deploy"&&"blue_background"}`} >
                            <div className={"tab_number"} >{3}</div>
                            <div>
                                <h3>Deploy</h3>
                                <span>Deploy your contract on the network</span>
                            </div>
                        </div>
                    </Segment>
                    <Segment className={"compile_right"}>
                        {active==="customize"?
                            <TestCustomized
                                changeTab={(data)=>handleTab(data)}
                                license={license} id={props.match.params.id}
                            />
                            :(active==="compile"?
                                <TestCompileResult/> :
                                <TestDeploy />)
                        }
                    </Segment>
                </Container>

            </Layout>
        );
    }
    return <div>Not found Retry</div>
};

export default TestSmartContract;