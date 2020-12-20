import React, { useState} from 'react';
import "../../../assets/scss/compile.css"
import {Container, Segment} from "semantic-ui-react";
import Layout from "../../../hoc/Layout";
import {flowRight as compose} from "lodash";
import {compile, licenseById, me_Query} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import {CompileResult, Customized, Deploy} from "./CompileCustomizedContract";
import { useMutation, useQuery} from "@apollo/client";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import {withAlert} from "react-alert";
import {Client} from "../../../queries/Services";
const alphabet=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

const Compile =(props)=> {
    const [active,setActive]=useState("customize");
    const [licenses,setLicenses]=useState(null);
    const [name,setName]=useState("");
    const [cloading,setCLoading]=useState(false);
    const alert=props.alert;

    const handleChange=(event)=>{
         const {value}=event.target;
        if (alphabet.test(value)) {
            setName(value)
        }
        if (value===""){
            setName(value)
        }
    }
    const [newCompile]=useMutation(compile,{
        client:Client,
        onCompleted:data => {
            setActive('compile');
            setCLoading(false)
        },
        onError:error1 => {
            alert.error(error1.toString(),{timeout:2000})
        },
        refetchQueries:me_Query
    })
   const OnComplied=(liecense)=>{
       setCLoading(true)
       newCompile({
           variables:{
               name:name.toString(),
               sId:liecense.order.smartContract.id,
               pId:liecense.purchasedContract.id,
               lId:liecense.id
           },
           context: {
               headers: {
                   authorization: localStorage.getItem("token")
               }
           }
       });
    }

   const {error, loading, data} = useQuery(licenseById, {
        variables: {id: props.match.params.id},
        client: Client,
        onCompleted: data1 => {
            setLicenses(data1.licenseById)
            console.log(data1)
        }
    })
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    console.log(data,loading,error)
    const liecense=data.licenseById;
    console.log(licenses)
    return (
        <Layout>
            <Container fluid className={"compile flex"}>
                <Segment className={"compile_left"}>
                    <div className={`sub_tab ${active==="customize"&&"blue_background"}`}>
                        <div className={"tab_number"} >2</div>
                        <div>
                            <h3>Customize</h3>
                            <span>Insert your own parameter</span>
                        </div>
                    </div>
                    <div className={`sub_tab ${active==="compile"&&"blue_background"}`} >
                        <div className={"tab_number"} >2</div>
                        <div>
                            <h3>Compile</h3>
                            <span>Create the customized contract</span>
                        </div>
                    </div>
                    <div className={`sub_tab ${active==="deploy"&&"blue_background"}`} >
                        <div className={"tab_number"} >{3}</div>
                        <div>
                            <h3>Deploy</h3>
                            <span>Deploy your contract on the network</span>
                        </div>
                    </div>
                </Segment>
                <Segment className={"compile_right"}>
                    {active==="customize"?
                        (cloading? <Spinner2/>:
                            <Customized
                                change={(event)=>handleChange(event)}
                                name={name}
                                contract={liecense.order.smartContract}
                                onCompiled={()=>OnComplied(liecense)}
                            />
                        )
                        :(active==="compile"? <CompileResult setUser={props.setUser} />: <Deploy />)
                    }
                </Segment>
            </Container>
        </Layout>
    )
}
export default compose(connect(null,{setUser}),withAlert())(Compile);