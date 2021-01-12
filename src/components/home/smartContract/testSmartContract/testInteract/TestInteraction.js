import React, {useState} from 'react';
import CompileLayout from "../../../../../hoc/CompileLayout";
import {getTestABI, testLicenseById} from "../../../../../queries/queries";
import {Spinner2} from "../../../../ui/Spinner";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../../queries/Services";
import gql from "graphql-tag";
import TestIntract from "./TestInteract.component";

const license=gql`query ($id:ID!){
  testLicenseById(id: $id) {
  id
    testCompilations {
      used id
      testDeployments { id
        contractAddress ownerAddress
      }
    }
  }
}

`

const TestInteraction = (props) => {
    const [Loading,setLoading]=useState(true)

    const id=props.match.params.id;


    const RenderData=()=> {
        const {error, loading, data} = useQuery(license, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },
        })
        if (loading) return <Spinner2/>
        if (error) return <p>{error.toString()}</p>
        if (data && !loading) {
            const license = data.testLicenseById
            return (
                <TestIntract license={license}/>
            );
        }
    }
    return (
        <CompileLayout type={'test'}>
            <h2>Start Intracting with  Contract</h2>
            {RenderData()}
        </CompileLayout>
    );
}
        
export default TestInteraction;
