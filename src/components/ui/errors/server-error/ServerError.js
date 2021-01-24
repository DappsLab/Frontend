import React from 'react';
import './server-error.styles.css'
import {Icon} from "semantic-ui-react";

const ServerError = () => {
    console.log()
    return (
        <div className={'refresh-page'} style={{height:document.documentElement.clientHeight}} >
            <div>
                <h1>500 Internal Server Error</h1>
                <span>Oops, something went wrong</span>
                <p>Try to refresh <Icon loading name={"refresh"}/> this page or feel free to contact us if the problem persists</p>
            </div>
        </div>
    );
}

export default ServerError;
