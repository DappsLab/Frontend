import React, {useEffect} from 'react';

import {Route, Redirect, Switch} from "react-router-dom";


const PublicRoute = ({user,component:Comp,...rest}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return <Route {...rest} component={(props)=>(
        rest.restricted ?
            (!!localStorage.getItem('token')  ?
                     <Redirect to={"/"}/>
                    :
                    <Comp {...props} user={user}/>
            )
            :
            <Comp {...props} user={user}/>
    )}/>
};

export default PublicRoute;