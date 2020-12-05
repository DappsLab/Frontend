import React from 'react';
import '../../../assets/scss/SearchResult.css'
import {CheckBox} from "../../ui/FormFields";
import CustomizedSlider from "../../ui/slider";
import Layout from "../../../hoc/Layout";
import {Loader,Select,Button, Form,Container,Item} from "semantic-ui-react";
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
const alphabetRegex=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

 class SearchResult extends React.Component{
     state={
         sliderMinValue:0,
         sliderMaxValue:1500,
         searchResult:null,
         show:false,
         loading:true,
         visible:false,
         sort:'',
         name:"",
         tag:"",
         checkboxs:[
             {check:false,name:"DOCUMENTS"},
             {check:false,name:"SOCIAL"},
             {check:false,name:"FINANCIAL"},
             {check:false,name:"ESCROW"},
             {check:false,name:"TOOLS"},
             {check:false,name:"UTILITY"},
         ]
     }
     componentDidMount() {
         const category="ESCROW UTILITY TOOLS FINANCIAL DOCUMENTS SOCIAL";
         const search=this.props.match.params.search;
         const that=this;
         if (category.toLowerCase().includes(search.toLowerCase())){
             const newData =  Object.assign([], this.state.checkboxs);
             for (let i=0;i<6;i++){
                 if (newData[i].name===search.toUpperCase()){
                     newData[i].check = newData[i].check !== true;
                 }
             }
             this.setState({checkboxs:newData});
             this.onSubmit();
         }else {
             client.query({
                 query: gql` query ($search:String){
                     searchSmartContract(searchSmartContract: {contractName: $search}){
                         contractName  description id tags contractCategory
                         image shortDescription publishingDateTime
                         publisher {
                             fullName
                             avatar
                         }
                         singleLicensePrice
                     }
                 }`, variables: {search}
             }).then(result => {
                 that.setState({loading: false, searchResult: result.data.searchSmartContract})
             }).catch(error => {
                 console.log(error);
             });
         }
     }
      returnColor=(color)=>{
     switch (color){
         case "TOOLS":
             return "orange";
         case "SOCIAl":
             return "grey";
         case "DOCUMENTS":
             return "teal";
         case "UTILITY":
             return "purple";
         case "ESCROW":
             return "blue";
         case "FINANCIAL":
             return "green";
         default:
             return "violet";
     }
 }
     color=[
         {0:"violet",1:"blue",2:"orange",3:"grey",4:"real",5:"yellow",6:"brown"}
     ]
     countryOptions = [
         { key: 'N', value: 'NEWEST', text: 'Newest contract' },
         { key: 'L', value: 'LOW_TO_HIGH', text: 'Price: low to high' },
         { key: 'H', value: 'HIGH_TO_LOW', text: 'Price: high to low' },
     ]
     renderCheckbox=()=>(
        this.state.checkboxs.map((check,index)=>(
            <CheckBox key={check.name} check={check.check}
            name={check.name}
            index={index}
            change={(element)=> this.updateCheckBox(element)}/>
        ))
    )
    setSliderValues=(event,value)=>{
         this.setState({sliderMinValue:value[0],sliderMaxValue:value[1]})
    }

     handleChange = event => {
         const {name,value}=event.target;
         if (alphabetRegex.test(value)){
             this.setState({[name]:value},()=>{});
         }
         if (value===""){
             this.setState({[name]:value},()=>{});
         }
     }
    updateCheckBox (element){
        const newData =  Object.assign([], this.state.checkboxs);
         for (let i=0;i<6;i++){
             if (i===element.index){
                 newData[i].check = newData[i].check !== true;
             }
         }
         this.setState({checkboxs:newData});
    }
    onSubmit=()=>{
         this.setState({close:true,loading:true});
         const that=this;
         let {sort,tag,checkboxs,sliderMaxValue,sliderMinValue,name}=this.state;
         sliderMaxValue=sliderMaxValue*5;
         const category=[];
         checkboxs.map(checkbox=>{
             if (checkbox.check){
                 category.push(checkbox.name)
             }
         });
        console.log(sort,tag,category,sliderMinValue,name,sliderMaxValue)
         const input= {         }
         if (name!==""){
             input["contractName"]=name
         }
         if (sort!=="") {
            input["sortBy"] = sort
         }
         if (tag!==""){
             input["tags"]=tag
         }
         if (category.length>0){
             input["contractCategory"]=category
         }
         input["minPrice"]=sliderMinValue.toString();
         input["maxPrice"]=sliderMaxValue.toString();
         client.query({
             query: gql`query ($input:SearchSmartContract){
                 filterSmartContract(searchSmartContract:$input) {
                     contractName  description id tags contractCategory
                     image shortDescription publishingDateTime
                     publisher {
                         fullName
                         avatar
                     }
                     singleLicensePrice 
                 }
             }`,
             variables:{input}
         }).then(result =>{
             that.setState({loading:false,searchResult:result.data.filterSmartContract})
         })
    }
     renderResult(){
         const {searchResult}=this.state;
         if(searchResult.length>0) {
             return searchResult.map(data=>{
                    return <Item key={data.id}>
                         <Item.Image src={data.image}/>
                         <Item.Content className={"search_data"}>
                             <Item.Header>{data.contractName}</Item.Header>
                             <Item.Meta >
                                 <span>Published By</span>
                                 <span>{data.publisher.fullName}</span>
                                 <span>|{data.publishingDateTime}</span>
                             </Item.Meta>
                             <Item.Description>
                                 {data.shortDescription}
                             </Item.Description>
                             <Item.Extra className={"extra"}>
                                 <div className={"contract_category"}>
                                     {data.contractCategory.map((category, index) => {
                                         return <Button disabled
                                             size={"mini"}
                                             color={this.returnColor(category)} key={category}>
                                             {category}</Button>
                                     })
                                     }
                                 </div>
                                 <div className={"search_tag flex"} >
                                     {data.tags.map(tag=>{
                                         return <a key={tag} href={'#'}> #{tag} </a>
                                     })}
                                 </div>
                                 <span>{data.singleLicensePrice} Dapps</span>
                             </Item.Extra>
                         </Item.Content>
                     </Item>
                 })

         }else {
             return (
                 <Item >
                     <Item.Content>
                         Not Found
                     </Item.Content>
                 </Item>
             )
         }
     }
     render() {
         const {loading,name,sort,tag,sliderMinValue,sliderMaxValue,visible}=this.state;
         return (
             <Layout>
                 <div className={"container flex sr_container"}>
                     <div className={"search_left"}>
                         <h3>Search Filter</h3>
                         <Form>
                             <Form.Field>
                                 <label>Sort By:</label>
                                 <Select
                                     value={sort} options={this.countryOptions}
                                     onChange={(event,{value})=>{
                                         this.setState({sort:value});
                                     }} name={'sort'} fluid
                                     type={'select'} placeholder={"Select Category"}
                                 />
                             </Form.Field>
                             <Form.Field>
                                 <label>Filter Smart Contract</label>
                                 <Form.Input
                                     placeholder={"Enter Search Terms"} type={"text"}
                                     value={name}
                                     name="name" onChange={this.handleChange} />
                             </Form.Field>

                             <Form.Field>
                                 <label>Filter by Tags</label>
                                 <Form.Input
                                     placeholder={"Enter Search Terms"} type={"text"}
                                     value={tag}
                                     name="tag" onChange={this.handleChange} />
                             </Form.Field>
                             <Form.Field>
                                 <label>Select Categories</label>
                             </Form.Field>
                             {this.renderCheckbox()}
                             {<CustomizedSlider
                                 changeSlider={(event,value)=> this.setSliderValues(event,value)}
                             />}
                             <span className={"slider_value"}>{sliderMinValue}-{sliderMaxValue} Dapps</span>
                             {<Button fluid className={"drawerbtn"} onClick={this.onSubmit}>Apply</Button>}
                         </Form>
                     </div>
                    <div className={"searchRight"}>
                        {loading?<Loader content={"Loading"} active size={"big"}/> :
                            <Container >
                                <Item.Group divided>
                                    {this.renderResult()}
                                </Item.Group>
                            </Container>
                        }
                    </div>
                </div>
             </Layout>
         );
     }
}
export default (SearchResult);