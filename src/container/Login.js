import React from "react";
import { useHistory } from 'react-router-dom';


const Login=(props)=>{
    const history=useHistory();

    return(
        <div>
            <h1>
                I am login
    
            </h1>
            {console.log(props.location.state.name)}
            <button onClick={()=>{history.push('/')}}>I am login</button>
        </div>
    );
};
export default Login
