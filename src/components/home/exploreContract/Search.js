import React, {Component} from 'react';

import '../../../assets/scss/SearchBar.css'
import {SearchField} from "../../ui/FormFields";
import {Validation} from "../../ui/mise";
import Alert from '@material-ui/lab/Alert';


class Search extends Component {
    state={
        show:false,
        message:'',
        formData:{
            search:{
                element:'input',
                value:'',
                config:{
                    name:'search_input',
                    type:'text',
                    placeholder:'Searcg...'
                },
                validation:{
                    required:true
                }
            }
        }
    };
    onKeyUp(event) {
        if (event.charCode === 13) {
            this.submitForm();
        }

    }
    submitForm(){
       this.props.history.push("/search_result")
    }
    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        newFormData[element.id] = newElement;
        if(newElement.value===""){
            this.setState({show:false,formData:newFormData})
        }else {
            this.setState({
                show: validationData[0],
                message: validationData[1],
                formData: newFormData
            })
        }
    }
    render() {
        return (
            <div>
                <SearchField
                    id={'search'}
                    formData={this.state.formData.search}
                    change={(element)=> this.updateForm(element)}
                    press={ (event)=> this.onKeyUp(event)}
                />
                <div className="clear"> </div>
                {this.state.show ?
                    <Alert className={"error_label"} severity="error">{this.state.message}</Alert>
                    :null
                }
            </div>
        );
    }
}

export default Search;
