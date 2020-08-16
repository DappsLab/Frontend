import React, {Component} from 'react';
 import  '../../../assets/scss/detailed_contract.css';
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import RadioButtons from "../../ui/RadioButton";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {FormField} from "../../ui/FormFields";



class  DetailedContract extends Component{

    state= {
        radioValue:"one",
        formData: {
            oneDeployment: {
                element: 'input',
                value: '',
                config: {
                    label: 'One Deployment',
                    name: 'terms_by',
                    type: 'input',
                },
                validation: {
                    valid: true,
                },
                showLabel:true,
                disabled:false
            },
            unlimited: {
                element: 'input',
                value: '',
                config: {
                    label: 'Unlimited License',
                    name: 'terms_by',
                    type: 'input',
                },
                validation: {
                    valid: true,
                },
                showLabel:true,
                disabled:false
            },
        }
    }
    btn_links= [
        {title :"Buy contract",linkTo:"/buy_contract"},
        {title :"Test contract",linkTo:"/test_contract"}
    ]
    handleChange = (event) => {
        this.setState({radioValue:event.target.value});
    };
    renderButton=()=>(
        this.btn_links.map(link=>(
            <Link to={link.linkTo} key={link.title}>
                <Button className={"testbtn"}>{link.title}</Button>
            </Link>
        ))
    )

    render() {
        return (
            <div className={"contractContainer flex"}>
                <Fade top delay={300}>
                    <div className={"contractLeft"}>
                        SHow result
                    </div>
                </Fade>
                <Fade top delay={300}>
                    <div className={"contractRight"}>
                        <h3 className={"buy-top"}><span>Buy</span></h3>
                        <div className={"flex"}><FontAwesomeIcon className={"checkCircle"} icon={faCheckCircle}/>
                            <p>Reviewed by Dappslab</p></div>
                        <h4>Price</h4>
                        <div>
                            <RadioButtons
                                value={this.state.radioValue}
                                change={(event)=> this.handleChange(event)}
                                input={
                                    <FormField id={'oneDeployment'}
                                         formData={this.state.formData.oneDeployment}
                                         change={(element)=> this.updateForm(element)}/>
                                }
                                input2={
                                    <FormField id={'unlimited'}
                                        formData={this.state.formData.unlimited}
                                       change={(element)=> this.updateForm(element)}/>
                                }
                            />
                        </div>
                        <div className={"btnGroups flex"}>
                            {this.renderButton()}
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
}
export default DetailedContract
