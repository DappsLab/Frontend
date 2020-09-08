import React from 'react';
import '../../../assets/scss/SearchResult.css'
import FilterDrawer from "../../ui/FilterDrawer";
import {CheckBox, FormField} from "../../ui/FormFields";
import {Validation} from "../../ui/mise";
import {Button} from "@material-ui/core";
import CustomizedSlider from "../../ui/slider";
import handleChnage from "../../ui/slider"
import Layout from "../../../hoc/Layout";
export default  class SearchResult extends React.Component{
     state={
         sliderMinValue:"",
         sliderMaxValue:"",
         show:false,
         message:'',
         formData: {
             sort: {
                 element: 'select',
                 value: '',
                 config: {
                     label: 'Sort By:',
                     name: 'sort_by',
                     type: 'select',
                     options: [
                         {key: 'N', value: 'Newest contract'},
                         {key: 'L', value: 'Price: low to high'},
                         {key: 'H', value: 'Price: high to low'},
                         {key: 'T', value: 'Topsellers'}
                     ]
                 },
                 validation: {
                     required: false,
                 },
                 showLabel:true
             },
             terms: {
                 element: 'input',
                 value: '',
                 config: {
                     label: 'Filter Smart Contracts:',
                     name: 'terms_by',
                     type: 'input',
                 },
                 validation: {
                     required: true,
                 },
                 showLabel:true
             },
             tags: {
                 element: 'input',
                 value: '',
                 config: {
                     label: 'Filter by Tags:',
                     name: 'tags',
                     type: 'input',
                 },
                 validation: {
                     required: true,
                 },
                 showLabel:true
             }
         },
         checkboxs:[
             {check:false,name:"Documents"},
             {check:false,name:"Escrow"},
             {check:false,name:"Financial"},
             {check:false,name:"Social"},
             {check:false,name:"Tools"},
             {check:false,name:"Utility"},
         ]
     }
    renderCheckbox=()=>(
        this.state.checkboxs.map((check,index)=>(
            <CheckBox key={check.name} check={check.check}
            name={check.name}
            index={index}
            change={(element)=> this.updateCheckBox(element)}/>
        ))
    )
    setSliderValues=(event,value)=>{
         console.log(value)
         // this.setState({sliderMinValue:min,sliderMaxValue:max})
    }
    updateCheckBox (element){
        const newData =  Object.assign([], this.state.checkboxs);
         for (let i=0;i<6;i++){
             if (i===element.index){
                 newData[i].check=true;
             }
         }
         this.setState({checkboxs:newData});
    }
    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        newElement.value = element.event.target.value;

        let validationData= Validation(newElement);
        newFormData[element.id] = newElement;

            this.setState({
                show: validationData[0],
                message: validationData[1],
                formData: newFormData
            })
        console.log(this.state.formData)
     }
    onSubmit=()=>{
         this.setState({close:true})
         console.log("good")
    }
     render() {
         return (
             <Layout>
                 <div className={"container flex sr_container"}>
                     <FilterDrawer
                         select={
                             <FormField id={'sort'}
                             formData={this.state.formData.sort}
                             change={(element)=> this.updateForm(element)}/>
                         }
                         input={
                             <FormField id={'terms'}
                             formData={this.state.formData.terms}
                             change={(element)=> this.updateForm(element)}/>
                         }
                        checkbox={this.renderCheckbox()}
                         tagInput={
                             <FormField id={'tags'}
                             formData={this.state.formData.tags}
                             change={(element)=> this.updateForm(element)}/>
                         }
                         slider={<CustomizedSlider
                             newValue={this.state.newValue}
                             changeSlider={(event,value)=> this.setSliderValues(event,value)}
                         />}
                         button={<Button className={"drawerbtn"} onClick={this.onSubmit}>Apply</Button>}
                     />
                     {console.log(handleChnage)}
                     <div className={"searchRight"}>
                         No result
                     </div>
                 </div>
             </Layout>
         );
     }
}
