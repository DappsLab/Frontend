import React from 'react';
import ContractCard from "./exploreContract/ContractCard";
import UploadSmartContract from "./UploadSmartContract";

const Home = () => {
    return (
        <div>
            <ContractCard/>
            <UploadSmartContract/>
        </div>
    );
};

export default Home;
