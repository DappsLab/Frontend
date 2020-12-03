import React, {Component} from 'react';
import "../../../assets/scss/compile.css"
import {Container, Segment} from "semantic-ui-react";
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from "lodash";
import {graphql} from "react-apollo";
import { licenseById} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import {CompileResult, Customized, Deploy} from "./CompileCustomizedContract";
import {ApolloClient, gql,InMemoryCache} from "@apollo/client";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import {withAlert} from "react-alert";
const alphabet=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);
const Authclient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem("token"),
    }
});
class Compile extends Component {
    state={
        active:"customize",
        name:"",
        loading:false,
    }
    tab_data=[
        {id:1,heading:"Customize",subheading:"Insert your own parameter"},
        {id:2,heading:"Compile",subheading:"Create the customized contract"},
        {id:3,heading:"Deploy",subheading:"Deploy your contract on the network"}
    ]
    background=(id)=>{
        const {active}=this.state;
        switch (id){
            case 1:
                return active==="customize"?"blue_background":"";
            case 2:
                return active==="compile"?"blue_background":"";
            case 3:
                return active==="deploy"?"blue_background":"";
            default:
                return ;
        }
    }
    rendnerTab() {
        return this.tab_data.map(data => {
            return <div className={`sub_tab ${this.background(data.id)}`} key={data.id}>
                <div className={"tab_number"} >{data.id}</div>
                <div>
                    <h3>{data.heading}</h3>
                    <span>{data.subheading}</span>
                </div>
            </div>
        })
    }

    renderActiveTabData(){
        const {active} =this.state;
        if (active==="customize"){
            if (this.state.loading){
                return <Spinner2/>
            }else {
                return <Customized
                    change={this.handleChange}
                    name={this.state.name}
                    contract={this.props.data.licenseById.order.smartContract}
                    onCompiled={this.onComplied}
                />
            }
        }else if (active==="compile"){
            return <CompileResult  changeTab={this.changeTab}/>
        }else if (active==="deploy"){
            return <Deploy changeTab={this.changeTab}/>
        }
    }
    handleChange=(event)=>{
        const {value}=event.target;
        if (alphabet.test(value)) {
            this.setState({name: value})
        }
        if (value===""){
            this.setState({name:""})
        }
    }
    onComplied=()=>{
        const license=this.props.data.licenseById
        this.setState({loading:true})
        const name=this.state.name;
        const alert=this.props.alert;
        const that=this;
       Authclient.mutate({
          mutation: gql` mutation ($name:String!,$sId:ID!,$pId:ID!,$lId:ID!) {
              compileContract(newCompile: {compilationName:$name,smartContract: $sId, purchasedContract: $pId, license: $lId}) {
                  id compiledFile
              }
          }`, variables:{
              name:name.toString(),
              sId:license.order.smartContract.id,
              pId:license.purchasedContract.id,
              lId:license.id
          }
       }).then(data => {
           if (data.data.compileContract){
               Authclient.query({
                   query: gql`query {
                       me{
                           avatar address fullName id type twoFactorCode
                           email location userName twoFactorEnabled balance
                           kyc{   birthDate
                               building city country kycStatus mobile
                               nationality postalCode street kycStatus
                           }
                           orders{
                               id dateTime fee price status transactionHash
                               orderUsed smartContract {
                                   contractName
                               }
                           }
                           purchasedContracts {
                               customizationsLeft id unlimitedCustomization
                               licenses {
                                   purchaseDateTime id used
                                   order {
                                       id status licenseType
                                       smartContract {
                                           id contractName image
                                       }
                                   }
                               }
                               smartContract {
                                   contractName id
                               }
                           }
                       }
                   }`
               }).then(resultl=>{
                   that.props.setUser(resultl.data.me)
                   that.setState({loading:false,active:"compile"})
               }).catch(error=>{
                   console.log(error.toString())
                   alert.error(error.toString(),{timeout:5000})
                   that.setState({loading:false})
               })
           }
       }).catch(error=>{
           alert.error(error.toString(),{timeout:5000})
           console.log(error.toString())
           that.setState({loading:false})
       })
    }
    render() {
        return (
            <Layout>
                {this.props.data.loading?<Spinner2/> :
                    <Container fluid className={"compile flex"}>
                        <Segment className={"compile_left"}>
                            {this.rendnerTab()}
                        </Segment>
                        <Segment className={"compile_right"}>
                            {this.renderActiveTabData()}
                        </Segment>
                    </Container>
                }
            </Layout>
        );
    }
}
export default compose(graphql(licenseById, {
    options: (props) => {
        return {
            variables: {
                id:props.match.params.id
            }
        }
    }}), connect(null,{setUser}),withAlert(),
)(Compile);