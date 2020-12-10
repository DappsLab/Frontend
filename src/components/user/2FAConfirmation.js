import React, {Component, useState} from 'react';
import {Grid, Form, Segment, Input} from 'semantic-ui-react'
import fa from "../../assets/images/fa.png"
import {gql} from "@apollo/client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {withAlert} from "react-alert";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";
import {Spinner2} from "../ui/Spinner";
import {me_Query, verify2FA} from "../../queries/queries";


const number=RegExp(/^[0-9]*$/);
const FAConfirmation = (props)=> {

    const [value,setValue]= useState('');
    const [loading,setLoading] =useState(false)
    const alert = props.alert;
    const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: props.match.params.token,
    }});
    const OnChange=async (event) => {
        const {name, value} = event.target;
        let token_value = "";
        if (name === "value") {
            if (number.test(value)) {
                if (value.length < 7) {
                    token_value = value;
                    setValue(value);
                    if (value.length === 6) {
                        setLoading(true)
                        const result = await client.query({
                            query: verify2FA, variables: {token: token_value}
                        }).catch(error=>{
                            alert.error(error.toString()+" Try Again",{timeout:3000})
                        })
                        if (result){
                            const data=result.data.verify2FA;
                            if (data){
                               const me=await client.query({
                                    query:me_Query
                                }).catch(error=>{
                                    alert.error(error.toString()+" Try Again",{timeout:3000});
                               })
                                setLoading(false);
                                if (me){
                                    localStorage.setItem("token",props.match.params.token);
                                    props.setUser(me.data.me)
                                    alert.success("Login Successfully", {timeout: 5000});
                                    props.history.push('/');
                                }
                            }else {
                                setLoading(false);
                                alert.error("Varification Code is Wrong. Try Again")
                            }
                        }
                    }
                }
            }
        }
    }
    return  loading?<Spinner2/>:(
        <Grid textAlign="center"  verticalAlign='middle'>
            <Grid.Column  style={{maxWidth:700}}>
                <Segment className={"fa_container"}>
                    <img src={fa} alt={"name"}/>
                    <h2>Two-step varification</h2>
                    <p>Enter a code from Google Authenticator to make sure everything works</p>
                    <Form>
                        <Form.Field>
                            <label>Your Varification Code</label>
                            <Input
                                value={value}
                                onChange={OnChange}
                                name={"value"}
                                placeholder='6-digits code'
                                type={"text"}
                            />
                        </Form.Field>
                        {/*<Button onClick={this.cancel}>*/}
                        {/*    <Icon name={"close"}/>Varify*/}
                        {/*</Button>*/}
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default  compose(
    connect(null, {setUser}),withAlert(),
)(FAConfirmation);