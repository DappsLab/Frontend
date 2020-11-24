import React, {Component} from 'react';

import '../../../assets/scss/SearchBar.css'
import {SearchField} from "../../ui/FormFields";
import {Validation} from "../../ui/mise";
// import {graphql} from "react-apollo";
import {getContract, search} from "../../../queries/queries";

import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

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
            this.setState({search:true});
            this.submitForm();
        }

    }
    submitForm(){
        const search=this.state.formData.search.value;
        console.log(search);
        client.query({
            query:search,
            variables:{search: search}
        })
        .then(result => console.log(result))
       // this.props.history.push(`/search_result`);
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
            </div>
        );
    }
}
// graphql(search)
export default (Search);
