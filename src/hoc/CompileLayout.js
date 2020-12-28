import React from 'react';
import {Container, Segment} from "semantic-ui-react";
import Layout from "./Layout";

const CompileLayout = (props) => {
    const {type}=props
    const compileTab=[
        {key:1,heading:"Customize",subHeading:"Insert your own parameter",link:"/customize_test_smart_contract"},
        {key:2,heading:"Compile",subHeading:"Create the customized contract",link:"/compiled_test_smart_contract"},
        {key:3,heading:"Deploy",subHeading:"Deploy your contract on the network",link:"/deploy_test_smart_contract"},
    ]
    const mainCompileTab=[
        {key:1,heading:"Customize",subHeading:"Insert your own parameter",link:"/customize_smart_contract"},
        {key:2,heading:"Compile",subHeading:"Create the customized contract",link:"/compiled_smart_contract"},
        {key:3,heading:"Deploy",subHeading:"Deploy your contract on the network",link:"/deploy_smart_contract"}
    ]
    return (
        <Layout>
            <Container fluid className={"compile flex"}>
                <Segment className={"compile_left"}>
                    {type==="test"?
                        compileTab.map(tab=>{
                            return  <div key={tab.link} className={`sub_tab ${window.location.pathname.includes(tab.link)  && "blue_background"}`}>
                                <div className={"tab_number"}>{tab.key}</div>
                                <div>
                                    <h3>{tab.heading}</h3>
                                    <span>{tab.subHeading}</span>
                                </div>
                            </div>
                        }):
                        mainCompileTab.map(tab=>{
                            return  <div key={tab.link} className={`sub_tab ${window.location.pathname.includes(tab.link)  && "blue_background"}`}>
                                <div className={"tab_number"}>{tab.key}</div>
                                <div>
                                    <h3>{tab.heading}</h3>
                                    <span>{tab.subHeading}</span>
                                </div>
                            </div>
                        })
                    }
                </Segment>
                <Segment className={"compile_right"}>
                    {props.children}
                </Segment>
            </Container>
        </Layout>
    );
};

export default CompileLayout;