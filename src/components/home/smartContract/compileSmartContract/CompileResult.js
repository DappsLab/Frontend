import React from 'react';
import {useQuery} from "@apollo/client";
import {licenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";
import {Button, Divider, Icon} from "semantic-ui-react";
import CompileLayout from "../../../../hoc/CompileLayout";
import GetABI from "./getCompileData/GetABI";
import GetBinery from "./getCompileData/GetBinery";


const CompileResult = (props) => {
    const id=props.match.params.id;

    const RenderData=()=> {
        const {error, loading, data} = useQuery(licenseById, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            },
        })
        if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data) {
            const license = data.licenseById
            const newID = license.compilations[license.compilations.length - 1].id
            return (
                <div className={'compile_result'}>
                    <h2>Successfully Compiled</h2>
                    <Divider/>
                    <Icon circular size={'huge'} inverted color='green' name={'checkmark'}/>
                    <p>Huray!</p>
                    <p>Your contract is compiled and ready for deployment</p>
                    {id && <div>
                        <GetABI id={newID}/>
                        <GetBinery id={newID}/>
                    </div>
                    }
                    <Button color={'green'} onClick={()=>{
                        props.history.push(`/deploy_smart_contract/${license.id}`)
                    }}>Next</Button>
                </div>
            )
        }
        return <div>Not Found</div>
    }
    return (
        <CompileLayout type={'main'}>
            {RenderData()}
        </CompileLayout>
    )
};

export default CompileResult;