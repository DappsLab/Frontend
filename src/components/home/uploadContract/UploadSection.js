import React, {Component} from 'react';
import "../../../assets/scss/upload_smart_contract.css"
import GeneralInfo from "./GeneralInfo";
import AssociatedFiles from "./AssociatedFiles";

class UploadSection extends Component {
    state = {
        publish:true,
        attach:false,
        filter:'General Info',
    };
    links=[
        {title:"General Info",linkTo:"/general_info"},
        {title:"Associated Files",linkTo:"/associated_files"}
    ]
    handleChange=(title)=>{
        this.setState({filter:title})
    }
    renderNav=()=>(
        this.links.map(link =>(
            <div key={link.title}
                onClick={this.handleChange.bind(this,link.title)}
                className={`cursor ${this.state.filter===link.title? 'active' :""}`}
                >
                {link.title}
            </div>
        ))
    )
    render() {
        return (
            <div className={"upload_bg"}>
                <section className={"indexContainer fullWidth"}>
                    <h2><span>Publish new  Smart Contract</span></h2>
                    <nav className={"flex uploadNav"}>
                        {this.renderNav()}
                    </nav>
                </section>
                {this.state.filter==="General Info" ?
                    <GeneralInfo/>
                    : <AssociatedFiles/>
                }

            </div>
        );
    }
}

export default UploadSection;
