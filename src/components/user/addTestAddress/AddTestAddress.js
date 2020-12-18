import React, {useState} from 'react';
import Layout from "../../../hoc/Layout";
import '../../../assets/scss/add_test_address.css'
import {Button, Table} from "semantic-ui-react";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {addTestAddress, me_Query} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";
import {Spinner2} from "../../ui/Spinner";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";

const AddTestAddress = (props) => {
    const {alert}=props;

    const [add]=useMutation(addTestAddress,{
        client:Client,
        context:{
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        onCompleted:data => {
            refetch();
           alert.success("address Generated",{timeout:2000});
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const AddAddress=()=>{
        add().catch(err=>{
            console.log(err);
        })
    }
    const {loading,data,error,refetch}=useQuery(me_Query,{
        client:Client,
        context:{
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        onCompleted:data => {
            props.setUser(data.me)
        },onError:error => {
            alert.error("new"+error.toString(),{timeout:3000})
        }
    });
    if (loading) return <Spinner2/>
    if (error) return <div>{error.toString()}</div>
    return (
        <Layout>
            <div className={'add-test'}>
                <h2>Add Test Address</h2>
                <Table>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={1}>No</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.me.testAddress.length>0&&
                            data.me.testAddress.map((test,index)=>{
                              return  <Table.Row key={test.id}>
                                    <Table.Cell>{index+1}</Table.Cell>
                                    <Table.Cell>{test.address}</Table.Cell>
                                    <Table.Cell>{test.balance}</Table.Cell>
                              </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
                <Button color={"green"} onClick={AddAddress}>Add new Adress</Button>
            </div>
        </Layout>
    );
};

export default compose(
    connect(null, {setUser}),
    withAlert()
) (AddTestAddress);
