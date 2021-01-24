import React from "react";
import './error.style.css'

const Error=(props)=>{
    const {contractError}=props
    return(
        <div className={'error-container'}>{contractError&&contractError}</div>
    )
}

export default  Error;