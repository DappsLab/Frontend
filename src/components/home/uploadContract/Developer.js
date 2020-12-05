import React from 'react';
import "../../../assets/scss/upload_section.css"
import {Link} from "react-router-dom";
import {Button} from "semantic-ui-react";


const Developer = () => {
    return (
        <section className={"uploadSection flex"}>
            <div>
                <h2>Developers!</h2>
                <p>You can upload your smart contract to DappsLab marketplace</p>
            </div>
            <Link to={"/upload_samrt_contract"}>
                <Button className={"cursor"}>Upload Smart Contract</Button>
            </Link>
        </section>
    );
};

export default Developer;