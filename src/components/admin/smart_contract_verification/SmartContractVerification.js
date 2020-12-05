import React, {Component} from 'react';
import {ApolloClient,gql, InMemoryCache} from "@apollo/client";
import {withAlert} from "react-alert";
import {Spinner2} from "../../ui/Spinner";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem("token"),
    }
});
class SmartContractVerification extends Component {
    state={
        data:null,
        loading:true,
    }
    componentDidMount() {
        const that=this;
        const alert=this.props.alert
        client.query({
            query: gql`  query  {
                searchPendingSmartContracts {
                    id
                    verified
                    publisher {
                        id
                        fullName
                    }
                    image
                }
            }`
        }).then(result=>{
            console.log(result.data.searchPendingSmartContracts)
            that.setState({loading:false,data:result.data.searchPendingSmartContracts})
        }).catch(error=>{
            alert.error(error.toString(),{timeout:5000});
            console.log(error.toString())
            that.setState({loading:false});
        })
    }
    render() {
        const {loading,data}=this.state
        return (
            <div>
                {loading?<Spinner2/> :
                    data.map(da=>{
                        return <div key={da.id}>{da.verified}</div>
                    })
                }
            </div>
        );
    }
}

export default  withAlert()(SmartContractVerification);