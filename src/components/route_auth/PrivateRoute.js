import React, {useEffect} from 'react';
import {Route,Redirect} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../queries/queries";
import {Client, match} from "../../queries/Services";
import { Spinner3} from "../ui/Spinner";
import {connect} from "react-redux";
import {setUser} from "../../reducer/user/user.actions";
import ServerError from "../ui/errors/server-error/ServerError";


const PrivateRoute = ({setUser,user,component:Comp,...rest}) => {
    useEffect(()=>{
        window.scrollTo(0,0);
    });
    const RenderQuery=()=>{
        const {loading,data,error,refetch}=useQuery(me_Query,{
            // fetchPolicy:'network-only',
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
        if (loading) return <div className={'main-spinner'}><Spinner3/></div>
        if (error) {
            return (
                match(error.toString())==="authentication" ?
                    <Redirect to="/login"/> :
                    <ServerError/>
            )
        }
        if (data) {
            if (data.me.isBlocked===true){
                if (rest.path==='/unblock_request'){
                    return <Route {...rest} component={(props)=>(
                        !!localStorage.getItem('token') ?
                            <Comp {...props} />
                            :
                            <Redirect to="/login"/>
                    )}/>
                }
                return <Redirect to={'/unblock_request'}/>
            }

            return <Route {...rest} component={(props) => (
                !!localStorage.getItem('token') ?
                    <Comp {...props} refetch={refetch} user={data.me}/>
                    :
                    <Redirect to="/login"/>
            )}/>
        }
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