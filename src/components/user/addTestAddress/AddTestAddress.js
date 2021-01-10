import React, {useState} from 'react';
import '../../../assets/scss/add_test_address.css'
import {Button, Icon, Table} from "semantic-ui-react";
import { useMutation, useQuery} from "@apollo/client";
import {deleteTestAddress,addTestAddress,requestCoin, me_Query} from "../../../queries/queries";
import {Client} from "../../../queries/Services";
import {withAlert} from "react-alert";
import {Spinner3} from "../../ui/Spinner";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import DashboardLayout from "../../../hoc/DashboardLayout";

const AddTestAddress = (props) => {
    const {alert}=props;
    const [user,setUser]=useState();

    const context={
        headers: {
            authorization: localStorage.getItem("token")
        }
    }
    const [add]=useMutation(addTestAddress,{
        client:Client, context:context,
        refetchQueries:[{query:me_Query,context:context}],
        onCompleted:data => {
           alert.success("address Generated",{timeout:2000});
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    });
    const [coin]=useMutation(requestCoin,{
        client:Client, context:context,
        refetchQueries:[{query:me_Query,context:context}],
        onCompleted:data => {

            alert.success("balance Added",{timeout:2000});
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const [remove]=useMutation(deleteTestAddress,{
        client:Client,refetchQueries:[{query:me_Query,context:context}],
        context:context,
        onCompleted:data => {
            alert.success("Address Removed",{timeout:2000});
        },onError:error => {
            alert.error(error.toString(),{timeout:3000})
        }
    })
    const AddAddress=()=>{
        const address=user.testAddress;
        if (address.length<10) {
            add().catch(err => {
                console.log(err);
            })
        }else {
            alert.error("You cannot add more Address");
        }
    }
    const AddBalance=(id)=>{
        coin({variables:{id:id}}).catch(error=>{
            console.log(error.toString())
        })
    }
    const RemoveAddress=(id)=>{
        remove({variables:{id:id}}).catch(error=>{
            console.log(error.toString())
        })
    }
    const {loading,data,error,refetch}=useQuery(me_Query,{
        client:Client,context:context,fetchPolicy:'network-only',
        onCompleted:data => {
            setUser(data.me)
            props.setUser(data.me)
        },onError:error => {
            alert.error("new"+error.toString(),{timeout:3000})
        }
    });
    if (loading) return <DashboardLayout user={props.user}>
        <Spinner3/>
    </DashboardLayout>
    if (error) return <div>{error.toString()}</div>
    return (
        <DashboardLayout  user={props.user}>
            <div className={'add-test'}>
                <h2>Add Test Address</h2>
                <Table>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell width={1}>No</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Delete Address</Table.HeaderCell>
                        <Table.HeaderCell>Add Balance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.me.testAddress.length>0&&
                            data.me.testAddress.map((test,index)=>{
                              return  <Table.Row key={test.id}>
                                  <Table.Cell>{index+1}</Table.Cell>
                                  <Table.Cell>{test.address}</Table.Cell>
                                  <Table.Cell>{test.balance}</Table.Cell>
                                  <Table.Cell style={{textAlign:'center'}}>
                                      <span onClick={()=>{RemoveAddress(test.id)}}> <Icon circular link  inverted color='red' name='delete'/></span>
                                  </Table.Cell>
                                  <Table.Cell><Button onClick={()=>AddBalance(test.id)}>Add Balance</Button></Table.Cell>
                              </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
                <Button color={"green"} onClick={AddAddress}>Add new Adress</Button>
            </div>
        </DashboardLayout>
    );
};

export default compose(
    connect(null, {setUser}),
    withAlert()
) (AddTestAddress);
