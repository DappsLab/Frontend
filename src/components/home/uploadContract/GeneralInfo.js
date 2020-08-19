import React, {Component} from 'react';
import "../../../assets/scss/general_info.css"
import {FormField} from "../../ui/FormFields";
import {Divider} from "@material-ui/core";
import Editor from "../../ui/Editor";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";
import reactHtmlParser from 'react-html-parser'

class GeneralInfo extends Component{
    state= {
        shortEditor:"",
        longEditor:"",
        formData: {
            Contract_name: {
                element: 'input',
                value: '',
                info: 'What categories suits your contract',
                config: {
                    label: 'Contract Name:',
                    name: 'cname',
                    type: 'input',
                },
                validation: {
                    required: true,
                },
                showLabel: true,
                showInfo: true
            },
            Contract_category: {
                element: 'input',
                value: '',
                info: 'This will show in the list as the title',
                config: {
                    label: 'Contract Category',
                    name: 'category',
                    type: 'input',
                },
                validation: {
                    required: true,
                },
                showLabel: true,
                showInfo: true
            },
            license: {
                element: 'input',
                value: '',
                config: {
                    label: 'Price per License',
                    name: 'license',
                    type: 'input',
                },
                validation: {
                    valid: true,
                },
                showLabel: true,
            },
            unlimited: {
                element: 'input',
                value: '',
                config: {
                    label: 'Unlimited License',
                    name: 'unlimited',
                    type: 'input',
                },
                validation: {
                    valid: true,
                },
                showLabel: true,
            },
            tag: {
                element: 'input',
                value: '',
                config: {
                    label: 'Tag',
                    name: 'tag',
                    type: 'input',
                },
                validation: {
                    valid: true,
                },
                showLabel: true,
            }
        }
    }
    lists=[
        {key:"0",input:
            <FormField id={'license'}
            formData={this.state.formData.license}
            change={(element) => this.updateForm(element)}/>
        },
        {key:"2",input:
            <FormField id={'unlimited'}
            formData={this.state.formData.unlimited}
            change={(element) => this.updateForm(element)}/>
        }
    ]
    UpdateEditor=(event,value,id)=>{
        {id==="one"?
            this.setState({shortEditor:reactHtmlParser(value.getData())})
            :
            this.setState({longEditor:reactHtmlParser(value.getData())})
        }
    }
    renderInput=()=>(
        this.lists.map(list=>(
            <div key={list.key} className={"flex priceInput"}>
                <span className={"block"}> Dapps</span>
                {list.input}
            </div>
        ))

    )
    render() {
        return (
            <div className={"generalContainer"}>
                <div className={"generalDescription flex"}>
                    <div>Upload the general information about your contract code (description,pricing,etc)</div>
                    <Link to={""                                                                    } className={"cursor"}>Download user guiding for adding a smart contract</Link>
                </div>
                <div className={"generalMain flex"}>
                    <div className={"generalLeft"}>
                        <Fade top delay={300}>
                            <FormField id={'Contract_name'}
                                 formData={this.state.formData.Contract_name}
                                 change={(element)=> this.updateForm(element)}/>
                        </Fade>
                        <Fade top delay={400}>
                            <FormField id={'Contract_category'}
                                 formData={this.state.formData.Contract_category}
                                 change={(element)=> this.updateForm(element)}/>
                        </Fade>
                        <Fade top delay={500}> {this.renderInput()}</Fade>
                        <Fade top delay={600}>
                            <FormField id={'tag'}
                                 formData={this.state.formData.tag}
                                 change={(element)=> this.updateForm(element)}/>
                        </Fade>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={"generalRight"}>
                        <Fade top delay={300}>
                            <Editor id={"one"}  change={(event,value,id)=> this.UpdateEditor(event,value,id)}/>
                        </Fade>

                        <Fade top delay={500}>
                            <Editor id={"two"} change={(event,value,id)=> this.UpdateEditor(event,value,id)}/>
                        </Fade>


                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralInfo;
