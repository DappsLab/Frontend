import React, {useState} from 'react';
import '../../../../../assets/scss/interact.css';
import {Spinner2} from "../../../../ui/Spinner";
import {useQuery} from "@apollo/client";
import {Client} from "../../../../../queries/Services";
import gql from "graphql-tag";
import TestIntract from "./TestInteract.component";
import Layout from "../../../../../hoc/Layout";
import GetTestBalance from "../../../../ui/GetTestBalance";
import TestGetABI from "../getSource/TestGetABI";
import TestGetBinery from "../getSource/TestGetBinery";


const testLicense=gql`query ($id:ID!){
  testLicenseById(id: $id) {
  id
    testCompilations {
    smartContract {
        contractName
        description
        image
      }
      used id
      testDeployments { id ownerPrivateKey
        contractAddress ownerAddress
      }
    }
  }
}

`

const TestInteraction =  (props) => {
    const [Loading,setLoading]=useState(true)
    const [newID,setnewID]=useState('')
    const [contractAddress,setcontractAddress]=useState('')
    const [ownerAddress,setownerAddress]=useState('')
    const [ownerKey,setownerKey]=useState('')
    const [Loader,setLoader]=useState(false)
    const id=props.match.params.id;


    // const RenderBalance=  async (address)=>{
    //     let value=await getContractBalance(address)
    //     console.log(value)
    //     return value;
    // }
    const RenderData=()=> {
        const {error, loading, data} = useQuery(testLicense, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },onCompleted:data1 => {
              try {
                  const license = data1.testLicenseById
                  const ID = license.testCompilations[license.testCompilations.length - 1].id;
                  const deploymentLength=license.testCompilations[license.testCompilations.length - 1].testDeployments.length;
                  const deploy=license.testCompilations[license.testCompilations.length - 1].testDeployments;
                  const contract=deploy[deploymentLength-1].contractAddress;
                  const address=deploy[deploymentLength-1].ownerAddress;
                  const key=deploy[deploymentLength-1].ownerPrivateKey;
                  setownerKey(key);
                  setownerAddress(address);
                  setcontractAddress(contract)
                  setnewID(ID);
                  setLoading(true)
              }catch (e) {
                  console.log(e.toString(),Loader)
              }
            }
        })
        if (loading) return <Spinner2/>
        if (error) return <p>{error.toString()}</p>
        if (data && !loading&&Loading&&contractAddress!=='') {
            const license = data.testLicenseById
            const contract = license.testCompilations[license.testCompilations.length - 1].smartContract;

            // const newID = license.testCompilations[license.testCompilations.length - 1].id;
            // const deploymentLength=license.testCompilations[license.testCompilations.length - 1].testDeployments.length;
            // const deploy=license.testCompilations[license.testCompilations.length - 1].testDeployments;
            // const contractAddress=deploy[deploymentLength-1].contractAddress;
            // const ownerAddress=deploy[deploymentLength-1].ownerAddress;
            // const ownerKey=deploy[deploymentLength-1].ownerPrivateKey;
            // let balance=  getContractBalance(contractAddress);
            // console.log("balance",balance)
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
                            <GetTestBalance address={contractAddress}/>
                        </div>
                        <div className={'left-block'}>
                            <label>Contract Creator:</label>
                            <address>{ownerAddress}</address>
                        </div>
                        <div className={"interaction-dowloads"}>
                            <TestGetABI setLoading={setLoader} id={newID}/>
                            <TestGetBinery setLoading={setLoader} id={newID}/>
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
                        <TestIntract license={license} newID={newID} ownerAddress={ownerAddress} ownerKey={ownerKey} contractAddress={contractAddress}/>
                      </div>
                </div>
            );
        }
    }
    return (
        <Layout>
            {RenderData()}
        </Layout>
    );
}
        
export default TestInteraction;
