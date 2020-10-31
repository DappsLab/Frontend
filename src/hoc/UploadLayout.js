import "../assets/scss/upload_smart_contract.css"
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Layout from "./Layout";
import {Grid} from "semantic-ui-react";


class UploadLayout extends Component{
    state={
        add:"General Info"
    }

    links=[
        {title:"General Info",linkTo:"/upload_samrt_contract/general_info"},
        {title:"Associated Files",linkTo:"/upload_samrt_contract/associated_files"}
    ]

     handleChange= title =>{
        this.setState({add:title})
    }
    renderNav=()=>(
        this.links.map(link =>(
            <Link to={link.linkTo} key={link.title}
                  onClick={()=>this.handleChange(link.title)}
                  className={`cursor ${window.location.pathname===link.linkTo? 'active' :""}`}
            >
                {link.title}
            </Link>
        ))
    )
    render() {
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' >
                        <Grid.Column style={{maxWidth:1355}}>
                            <Grid.Row className={"upload_bg"}>
                                    <h2><span>Publish new  Smart Contract</span></h2>
                                    <nav className={"flex uploadNav"}>
                                        {this.renderNav()}
                                    </nav>
                            </Grid.Row>
                            <Grid.Row>
                                {this.props.children}
                            </Grid.Row>
                        </Grid.Column>
                </Grid>
            </Layout>
        );
    }
};

export default UploadLayout;
