import React from 'react';
import ContractCard from "./smartContract/ContractCard";
import UploadSmartContract from "./uploadContract/UploadSmartContract";

const Home = () => {
    return (
        <div>
            <ContractCard/>
            <UploadSmartContract/>
        </div>
    );
};

export default Home;
