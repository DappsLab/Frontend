import React from 'react';
import Layout from "../../hoc/Layout";
import {
    CustomSmartContract,
    Decentralized,
    HomeBanner,
    HomeBlockChain,
    OurSmartContract
} from "./HomeComponents";
import '../../assets/scss/home.css'

const Home = (props) =>{
    return (
        <Layout>
            <HomeBanner/>
            <HomeBlockChain/>
            <OurSmartContract {...props}/>
            <CustomSmartContract {...props}/>
            <Decentralized {...props}/>
        </Layout>
    );
};

export default Home;
