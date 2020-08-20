import React, {Component} from 'react';
import "../../../assets/scss/upload_smart_contract.css"
import {Link} from "react-router-dom";


class UploadSmartContract extends Component {
    render() {
        return (
            <section className={"uploadSection"}>
                <div>
                    <h3>Developers!</h3>
                    <p>You can upload your smart contract to DappsLab marketplace</p>
                    <Link to={"/upload_samrt_contract/general_info"}>
                        <button className={"cursor"}>Upload Smart Contract</button>
                    </Link>
                </div>
                <img src={require('../../../assets/images/developers.jpg')} alt={""}/>
            </section>
        );
    }
}

export default UploadSmartContract;
