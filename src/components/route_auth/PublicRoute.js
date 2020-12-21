import React, {useEffect} from 'react';

import {Route, Redirect, Switch} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../queries/queries";
import {Client} from "../../queries/Services";
import {Spinner2} from "../ui/Spinner";
import {setUser} from "../../actions/Actions";


const PublicRoute = ({setUser,user,component:Comp,...rest}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    });

    const RenderQuery=()=> {
        const {loading, data, error, refetch} = useQuery(me_Query, {
            fetchPolicy: 'network-only',
            client: Client,
            onCompleted: data1 => {
                setUser(data1.me)
            },
            context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        })
        if (loading) return <div className={'main-spinner'}><Spinner2/></div>
        return (!!localStorage.getItem('token')?
            <Route {...rest} component={(props) => (
            rest.restricted ?
                (!!localStorage.getItem('token') ?
                        <Redirect  to={"/"}/>
                        :
                        <Comp {...props} refetch={refetch} user={data.me}/>
                ) :
                <Comp {...props} user={user}/>
        )}/> :<Route {...rest} component={(props)=>(
            rest.restricted ?
                (!!localStorage.getItem('token')  ?
                        <Redirect to={"/"}/>
                        :
                        <Comp {...props} user={null}/>
                ) :
                <Comp {...props} user={null}/>
        )}/>
        )
    }
    return RenderQuery()
    //     :<Route {...rest} component={(props)=>(
    //     rest.restricted ?
    //         (!!localStorage.getItem('token')  ?
    //                  <Redirect to={"/"}/>
    //                 :
    //                 <Comp {...props} user={user}/>
    //         ) :
    //         <Comp {...props} user={user}/>
    // )}/>
};

export default PublicRoute;