import React, {Component} from 'react';
import "../../../assets/scss/compile.css"
import {Container, Segment} from "semantic-ui-react";
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import { orderById} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import {CompileResult, Customized, Deploy} from "./CompileCustomizedContract";

class Compile extends Component {
    state={
        active:"customize",
    }
    tab_data=[
        {id:1,heading:"Customize",subheading:"Insert your own parameter"},
        {id:2,heading:"Compile",subheading:"Create the customized contract"},
        {id:3,heading:"Deploy",subheading:"Deploy your contract on the network"}
    ]
    background=(id)=>{
        const {active}=this.state;
        switch (id){
            case 1:
                return active==="customize"?"blue_background":"";
            case 2:
                return active==="compile"?"blue_background":"";
            case 3:
                return active==="deploy"?"blue_background":"";
        }
    }
    rendnerTab() {
        return this.tab_data.map(data => {
            return <div className={`sub_tab ${this.background(data.id)}`} key={data.id}>
                <div className={"tab_number"} >{data.id}</div>
                <div>
                    <h3>{data.heading}</h3>
                    <span>{data.subheading}</span>
                </div>
            </div>
        })
    }

    renderActiveTabData(){
        const {active} =this.state;
        if (active==="customize"){
            return <Customized contract={this.props.data.orderById.smartContract} onCompiled={this.onComplied}/>
        }else if (active==="compile"){
            return <CompileResult contract={this.props.data.orderById} changeTab={this.changeTab}/>
        }else if (active==="deploy"){
            return <Deploy changeTab={this.changeTab}/>
        }
    }
    onComplied=()=>{
        this.setState({active:"compile"})

    }
    render() {
        return (
            <Layout>
                {this.props.data.loading?<Spinner2/>
                :
                    <Container fluid className={"compile flex"}>
                        <Segment className={"compile_left"}>
                            {this.rendnerTab()}
                        </Segment>
                        <Segment className={"compile_right"}>
                            {this.renderActiveTabData()}
                        </Segment>
                    </Container>
                }
            </Layout>
        );
    }
}
export default compose(graphql(orderById, {
    options: (props) => {
        return {
            variables: {
                id:props.match.params.id
            }
        }
    }}),
)(Compile);