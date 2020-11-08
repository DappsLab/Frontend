import React from 'react';
import ContractCard from "./smartContract/ContractCard";
import "../../assets/scss/upload_section.css"
import Layout from "../../hoc/Layout";
import {Link} from "react-router-dom";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";



const Home = props =>{
    return (
            <Layout>
                <ContractCard/>
                <section className={"uploadSection"}>
                    <div>
                        <h3>Developers!</h3>
                        <p>You can upload your smart contract to DappsLab marketplace</p>
                        <Link to={"/upload_samrt_contract"}>
                            <button className={"cursor"}>Upload Smart Contract</button>
                        </Link>
                    </div>
                    <img src={require('../../assets/images/developers.jpg')} alt={""}/>
                </section>
                <AboutUs/>
                <OurTeam/>
            </Layout>
        );
};

export default Home;
