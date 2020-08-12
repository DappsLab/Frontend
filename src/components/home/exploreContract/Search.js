import React, {Component} from 'react';
import '../../../assets/scss/SearchBar.css'
import {SearchField} from "../../ui/FormFields";
import {Validation} from "../../ui/mise";

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
    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        console.log(newElement.value)
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
                />
                <div className="clear"> </div>
                {this.state.show ?
                    <div className={"error_label barContainer"}>{this.state.message}</div>
                    :null
                }
            </div>
        );
    }
}

export default Search;
