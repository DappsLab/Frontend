import React from 'react';
import {Loader,Dimmer} from "semantic-ui-react";
import "../../assets/scss/spinner.css"

export const Spinner = () => (
    <Dimmer active>
        <Loader size={"huge"} content={"Loading... "}/>
    </Dimmer>
)

export const Spinner2 = () => (
    <div className={"spinner2"}>
        <div className={"sub_spinner"}>
            <div> </div>
            <div> </div>
        </div>
    </div>
)
export const Spinner3 = () => (
    <div className="square-container">
        <div className="square">
            <div> </div>
            <div> </div>
        </div>
    </div>
)