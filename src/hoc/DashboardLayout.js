import "../assets/scss/upload_section.css"
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Layout from "./Layout";
import "../assets/scss/dashboard.css"
import {Grid} from "semantic-ui-react";


class DashboardLayout extends Component{
    links=[
        {title:"Purchased",linkTo:"/dashboard/purchased"},
        {title:"Tested Contract",linkTo:"/dashboard/test_contract"},
        {title:"Developed Contract",linkTo:"/dashboard/developed_contract"}
    ]
    renderNav=()=>(
        this.links.map(link =>(
            <Link to={link.linkTo} key={link.title}
                  className={`cursor ${window.location.pathname===link.linkTo? 'active' :""}`}
            >
                {link.title}
            </Link>
        ))
    )
    render() {
        return (
            <Layout>
                <Grid textAlign="center"  verticalAlign='middle' className={"indexContainer"} >
                    <Grid.Column style={{maxWidth:1355}}>
                        <div className="ui borderless menu">
                           <Link to={"/"}>Home </Link>
                            {window.location.pathname==="/dashboard/purchased"&& " Purchased"}
                            {window.location.pathname==="/dashboard/test_contract"&& " Tested Contract"}
                            {window.location.pathname==="/dashboard/developed_contract"&& " Developed Contract"}
                        </div>
                        <nav className={"flex uploadNav"}>
                            {this.renderNav()}
                        </nav>
                        {this.props.children}
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
};

export default DashboardLayout;
