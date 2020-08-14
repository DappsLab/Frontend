import React, {Component} from 'react';
import "../../assets/scss/upload_smart_contract.css"
class UploadSmartContract extends Component {
    render() {
        return (
            <section className={"uploadSection"}>
                <div>
                    <h3>Developers!</h3>
                    <p>You can upload your smart contract to DappsLab marketplace</p>
                    <button className={"cursor"}>Upload Smart Contract</button>
                </div>
                <img src={require('../../assets/images/developers.jpg')}/>
            </section>
        );
    }
}

export default UploadSmartContract;
