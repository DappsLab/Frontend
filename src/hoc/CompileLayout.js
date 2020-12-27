import React from 'react';
import {Container, Segment} from "semantic-ui-react";
import Layout from "./Layout";

const CompileLayout = (props) => {

    const compileTab=[
        {key:1,heading:"Customize",subHeading:"Insert your own parameter",link:"/customize_test_smart_contract"},
        {key:2,heading:"Compile",subHeading:"Create the customized contract",link:"/compiled_test_smart_contract"},
        {key:3,heading:"Deploy",subHeading:"Deploy your contract on the network",link:"/deploy_test_smart_contract"}
    ]
    return (
        <Layout>
            <Container fluid className={"compile flex"}>
                <Segment className={"compile_left"}>
                    {
                        compileTab.map(tab=>{
                            return  <div key={tab.heading} className={`sub_tab ${window.location.pathname.includes(tab.link)  && "blue_background"}`}>
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