import React from 'react';
import ContractCard from "./smartContract/ContractCard";
import UploadSmartContract from "./uploadContract/UploadSmartContract";

import Layout from "../../hoc/Layout";



const Home = props =>{
    return (
            <Layout>
                <ContractCard/>
                <UploadSmartContract/>
            </Layout>
        );
};

export default Home;
