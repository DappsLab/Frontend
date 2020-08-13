import React, {Component} from 'react';
import ContractCard from "./ContractCard";
import "../../../assets/scss/SmartContracts.css"
import "../../../assets/scss/app.css"
import Search from "./Search";
import {PeoplesImg} from "../../ui/Icons";

class Smart_Contracts extends Component {
    render() {
        return (
            <div>
                <section className="section1">
                    <div className="titleContainer">
                        <PeoplesImg className="peoplesImg"/>
                        <h1 className="title">Explore <span className="">Smart Contracts</span></h1>
                        <p>Smart Contracts available on DappsLab Marketplace suited to your business growth and for developer community. Explore! </p>
                    </div>
                    <Search/>
                </section>
                <section className="section2">
                    <ContractCard/>
                    <aside>

                    </aside>
                </section>

            </div>
        );
    }
}

export default Smart_Contracts;
