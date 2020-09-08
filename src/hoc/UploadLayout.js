import "../assets/scss/upload_smart_contract.css"
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Layout from "./Layout";


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
                <div className={"upload_bg"}>
                    <section className={"indexContainer"}>
                        <h2><span>Publish new  Smart Contract</span></h2>
                        <nav className={"flex uploadNav"}>
                            {this.renderNav()}
                        </nav>
                    </section>
                    {this.props.children}
                </div>
            </Layout>
        );
    }
};

export default UploadLayout;
