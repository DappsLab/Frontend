import React from 'react';
import "../../../assets/scss/upload_section.css"
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";


const Developer = (props) => {
    return (
        <section className={"uploadSection flex"}>
            <div>
                <h2>Developers!</h2>
                <p>You can upload your {props.type==="contract"?" smart contract ":" Dapps "} to DappsLab marketplace</p>
            </div>
            <Link to={props.link}>
                <Button className={"cursor"}>
                    Upload {props.type==="contract"?" Smart Contract":"Dapps"}
                </Button>
            </Link>
        </section>
    );
};

export default Developer;