import React, {useState} from 'react';
import {Button, Divider, Icon} from "semantic-ui-react";
import TestGetBinery from "./getSource/TestGetBinery";
import TestGetABI from "./getSource/TestGetABI";
import {useQuery} from "@apollo/client";
import {testLicenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import CompileLayout from "../../../../hoc/CompileLayout";

const TestCompileResult = (props) => {
    const [Loading,setLoading]=useState(true)
   const id=props.match.params.id;

   const RenderData=()=> {
       const {error, loading, data} = useQuery(testLicenseById, {
           variables: {id: id},
           fetchPolicy: 'network-only',
           client: Client, context: {
               headers: {
                   authorization: localStorage.getItem('token')
               }
           },
       })
       // if (loading) return <Spinner2/>
       if (error) return <div>{error.toString()}</div>
       if (data&&!loading) {
           const license = data.testLicenseById
           const newID = license.testCompilations[license.testCompilations.length - 1].id
           return (
            id && <div className={'get_data_btn'}>
              <TestGetABI setLoading={setLoading} id={newID}/>
              <TestGetBinery setLoading={setLoading} id={newID}/>
              <Button color={'green'} onClick={()=>{
                  props.history.push(`/deploy_test_smart_contract/${license.id}`)
              }}>Next</Button>
            </div>

           );
       }
   }
   return (
       <CompileLayout type={'test'}>
           <div className={'compile_result test_compie'}>
               <h2>Successfully Compiled</h2>
               <Divider/>
               <div className={'result_icons'}>
                   <div>
                       <Icon.Group size='big'>
                           <Icon loading={Loading} size='huge' name='setting ' />
                           <Icon size={'small'} name='checkmark' />
                       </Icon.Group>
                   </div>
               </div>
               <h3>Huray!</h3>
               <p>Your contract is compiled and ready for deployment</p>

           </div>
           {RenderData()}
       </CompileLayout>
   )
};

export default TestCompileResult;