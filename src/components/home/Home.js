import React from 'react';

import Layout from "../../hoc/Layout";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";


const Home = () =>{
    return (
        <Layout>
            <AboutUs place={true}/>
            <OurTeam/>
        </Layout>
    );
};

export default Home;
