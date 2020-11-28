import React from 'react';

import {Route,Redirect} from "react-router-dom";


const PublicRoute = ({user,component:Comp,...rest}) => {
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