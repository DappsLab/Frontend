import React from 'react';
import Layout from "../../hoc/Layout";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";
import {HomeBanner} from "./HomeComponents";
import '../../assets/scss/home.css'

const Home = () =>{
    return (
        <Layout>
            <HomeBanner/>
            <AboutUs place={true}/>
            <OurTeam/>

        </Layout>
    );
};

export default Home;
