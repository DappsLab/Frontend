import React, {useState} from 'react';
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
    const [Loading,setLoading]=useState(true)
    const RenderData=()=> {
        const {error, loading, data} = useQuery(licenseById, {
            variables: {id: id},
            fetchPolicy: 'network-only',
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }
        })
        // if (loading) return <Spinner2/>
        if (error) return <div>{error.toString()}</div>
        if (data&&!loading) {
            const license = data.licenseById
            const newID = license.compilations[license.compilations.length - 1].id
            return (
                id && <div className={'get_data_btn'}>
                        <GetABI setLoading={setLoading} id={newID}/>
                        <GetBinery setLoading={setLoading} id={newID}/>
                        <Button
                            color={'green'}
                            onClick={()=>{props.history.push(`/deploy_smart_contract/${license.id}`)}}
                        >Next</Button>
                    </div>
            )
        }
        return <div>Not Found</div>
    }
    return (
        <CompileLayout type={'main'}>
            <div className={'compile_result'}>
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
                {/*<Icon circular size={'huge'} inverted color='green' name={'checkmark'}/>*/}
                <h3>Huray!</h3>
                <p>Your contract is compiled and ready for deployment</p>
                {RenderData()}
            </div>

        </CompileLayout>
    )
};

export default CompileResult;