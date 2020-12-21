import React, {useEffect, useState} from 'react';
import {Route,Redirect} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../queries/queries";
import {Client} from "../../queries/Services";
import {Spinner2} from "../ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../../actions/Actions";

const PrivateRoute = ({setUser,user,component:Comp,...rest}) => {
    useEffect(()=>{
        window.scrollTo(0,0);
    });
    const RenderQuery=()=>{
        const {loading,data,error,refetch}=useQuery(me_Query,{
            fetchPolicy:'network-only',
            client:Client,
            onCompleted:data1 => {
                setUser(data1.me)
            },
            context:{
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        })
        if (loading) return <div className={'main-spinner'}><Spinner2/></div>
        return <Route {...rest} component={(props)=>(
            !!localStorage.getItem('token') ?
                <Comp {...props} refetch={refetch} user={data.me}/>
                :
                <Redirect to="/login"/>
        )}/>
    }

    return  localStorage.getItem('token')?
        RenderQuery()
        :<Route {...rest} component={(props)=>(
        !!localStorage.getItem('token') ?
           <Comp {...props} />
            :
            <Redirect to="/login"/>
    )}/>
};

export default  connect(null,{setUser})(PrivateRoute);