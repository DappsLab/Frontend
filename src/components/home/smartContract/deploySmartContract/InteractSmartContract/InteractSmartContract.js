import React, {useState} from 'react';
import gql from "graphql-tag";
import Layout from "../../../../../hoc/Layout";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../../queries/Services";
import {Spinner2} from "../../../../ui/Spinner";
import IntractArguments from "./InteractionArguments";
import GetMainAddress from "../../../../ui/GetMainAddress";
import GetABI from "../../compileSmartContract/getCompileData/GetABI";
import GetBinery from "../../compileSmartContract/getCompileData/GetBinery";

const license=gql`query ($id:ID!){
  licenseById(id: $id) {
  id
    compilations {
      used id  smartContract {
        contractName
        description
        image
      }
      deployments { id ownerPrivateKey
        contractAddress ownerAddress
      }
    }
  }
}

`
const IntractionSmartContract = (props) => {
    const [Loading,setLoading]=useState(true)
    const [newID,setnewID]=useState('')
    const [contractAddress,setcontractAddress]=useState('')
    const [ownerAddress,setownerAddress]=useState('')
    const [ownerKey,setownerKey]=useState('')
    const [Loader,setLoader]=useState(false)
    const id=props.match.params.id;

    const RenderMainData=()=>{
        const {error, loading, data} = useQuery(license, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },onCompleted:data1 => {
               try {
                   const license = data1.licenseById
                   const ID = license.compilations[license.compilations.length - 1].id;
                   const deploymentLength=license.compilations[license.compilations.length - 1].deployments.length;
                   const deploy=license.compilations[license.compilations.length - 1].deployments;
                   const contract=deploy[deploymentLength-1].contractAddress;
                   const address=deploy[deploymentLength-1].ownerAddress;
                   const key=deploy[deploymentLength-1].ownerPrivateKey;
                   setownerKey(key);
                   setownerAddress(address);
                   setcontractAddress(contract)
                   setnewID(ID);
                   setLoading(true)
               }catch (e) {
                   console.log("Query error",e.toString(),Loader)
               }
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <p>{error.toString()}</p>
        if (data && !loading&&Loading&&contractAddress) {
            const license = data.licenseById
            const contract=license.compilations[license.compilations.length - 1].smartContract
            return (
                <div className={'intreraction-container'}>
                    <div className={'intraction-left'}>
                        <h2>Contract Overview</h2>
                        <div className={'left-block'}>
                            <label>Contract Address:</label>
                            <address>{contractAddress}</address>
                        </div>
                        <div className={'left-block'}>
                            <label>Balance:</label>
                            <GetMainAddress address={contractAddress}/>
                        </div>
                        <div className={'left-block'}>
                            <label>Contract Creator:</label>
                            <address>{ownerAddress}</address>
                        </div>
                        <div className={'interaction-dowloads'}>
                            <GetABI setLoading={setLoader} id={newID}/>
                            <GetBinery setLoading={setLoader} id={newID}/>
                        </div>
                        <div className={'space'}>

                        </div>
                        <div className={'contract-detail'}>
                            <div className={'contract-img'}>
                                <img src={contract.image} alt={'img'}/>
                            </div>
                            <h3>{contract.contractName}</h3>
                            <h4>Description</h4>
                            <p>{contract.description}</p>
                        </div>
                    </div>
                    <div className={'intraction-right'}>
                        <h2>Start Intracting with  Contract</h2>
                        <h4>Read/Write Contract</h4>
                        <IntractArguments license={license} newID={newID} ownerAddress={ownerAddress} ownerKey={ownerKey} contractAddress={contractAddress}/>
                    </div>
                </div>
            );
        }
    }
    return (
        <Layout>
            {RenderMainData()}
        </Layout>
    );
};

export default IntractionSmartContract;
