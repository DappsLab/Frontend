import React from 'react';
import ContractCard from "./smartContract/ContractCard";
import UploadIndex from "./uploadContract/UploadIndex";

const Home = () => {
    return (
        <div>
            <ContractCard/>
            <UploadIndex/>
        </div>
    );
};

export default Home;
