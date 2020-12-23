import React, {useEffect, useState} from 'react';
import {Button, Divider, Icon} from "semantic-ui-react";
import GetBinery from "./getSource/GetBinery";
import GetAbi from "./getSource/GetABI";
import {useQuery} from "@apollo/client";
import {testLicenseById} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";
import {Spinner2} from "../../../ui/Spinner";

const TestCompileResult = (props) => {
    const {id,changeTab}=props
    const {error, loading, data} = useQuery(testLicenseById, {
        variables: {id: id},
        fetchPolicy:'network-only',
        client: Client, context: {
            headers: {
                authorization: localStorage.getItem('token')
            }
        },
    })
    if (loading) return  <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    if (data) {
        const license = data.testLicenseById
        const newID=license.testCompilations[license.testCompilations.length - 1].id
        return (
            <div className={'compile_result test_compie'}>
                <h2>Successfully Compiled</h2>
                <Divider/>
                <Icon circular size={'huge'} inverted color='green' name={'checkmark'}/>
                <p>Huray!</p>
                <p>Your contract is compiled and ready for deployment</p>
                {id && <div>
                    <GetAbi id={newID}/>
                    <GetBinery id={newID}/>
                </div>
                }
                <Button color={'green'} onClick={() => changeTab('deploy')}>Next</Button>
            </div>
        );
    }
};

export default TestCompileResult;