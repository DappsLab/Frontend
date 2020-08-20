import React, {Component} from 'react';
import UploadLayout from "../../../hoc/UploadLayout";
import Uploader from "../../ui/Uploader";
import {Divider} from "@material-ui/core";

class  AssociatedFiles extends Component{
    state={
        show:false,
    }
    submit=(files)=>{
        console.log(files.map(f => f.meta));
        this.setState({show:!this.state.show})
    }
    renderReady=()=>(
        <div className={"attached_files flex files_ready"}>
            <h3>Ready rockstar?</h3>
            <Divider/>
            <p>There are just a few more things we need from you:</p>
            <div className={"radioInput"}>
                <input type={"checkbox"}/>
                <p>I accept the term and condition</p>
            </div>
            <div className={"radioInput"}>
                <input type={"checkbox"}/>
                <p>I own the rights to the content that will be published</p>
            </div>
            <button>Publish</button>
        </div>
    )
    render() {
        return (
            <UploadLayout>
                <div className={"attached_files"}>
                    <Uploader onSubmit={(files) => this.submit(files)}/>
                </div>
                {this.state.show ?
                    this.renderReady()
                    : null
                }
            </UploadLayout>
        );
    }
};

export default AssociatedFiles;
