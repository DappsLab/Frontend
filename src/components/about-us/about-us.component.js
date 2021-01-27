import React from 'react';
import Layout from "../../hoc/Layout";
import './about-us.styles.css'
import  AboutContract from '../../assets/images/about.png'

const AboutUs =()=> {

    return (
        <Layout>
            <div className={'about-us'}>
                <div className={'about-dapplab'}>
                    <h2>What is DappsLab</h2>
                    <p>
                        The key idea of DappsLab is to bring decentralized applications (DApps) to
                        a new level, providing developers, end-users, and businesses with the way to convenient,
                        powerful and cost-effective DApps without trust to a third party through decentralization powered by blockchain technologies.
                    </p>
                </div>
                <img src={AboutContract} alt={'about us'}/>
            </div>
        </Layout>
    );
}

export default AboutUs;