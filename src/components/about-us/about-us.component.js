import React from 'react';
import Layout from "../../hoc/Layout";
import './about-us.styles.css'
import  AboutContract from '../../assets/images/about.png'
import tahir_img from '../../assets/images/qasim.jpg'
import tahseen_img from '../../assets/images/tahseen.jpeg'
import qasim_img from '../../assets/images/qasim1.jpg'
import {Icon} from "semantic-ui-react";

const AboutUs =()=>  (
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
                <div className={'our-team'}>
                    <div className={'our-team-card'}>
                        <div className={'image'}>
                            <img src={qasim_img} alt={'team member'}/>
                        </div>
                        <h2>Qasim Raheem</h2>
                        <span>Backend Developer</span>
                        <div className={'socila-links'}>
                            <Icon size={'big'} name={"facebook f"}/>
                            <Icon size={'big'}  name={'linkedin'}/>
                            <Icon size={'big'} name={"github"}/>
                        </div>
                    </div>
                    <div className={'our-team-card'}>
                        <div className={'image'}>
                            <img src={tahseen_img} alt={'team member'}/>
                        </div>
                        <h2>M Tahseen Mashaidi</h2>
                        <span>Frontend Developer</span>
                        <div className={'socila-links'}>
                            <Icon size={'big'} name={"facebook f"}/>
                            <Icon size={'big'}  name={'linkedin'}/>
                            <Icon size={'big'} name={"github"}/>
                        </div>
                    </div>
                    <div className={'our-team-card'}>
                        <div className={'image'}>
                            <img src={tahir_img} alt={'team member'}/>
                        </div>
                        <h2>Tahir Ayyaz</h2>
                        <span>All-Rounder</span>
                        <div className={'socila-links'}>
                            <Icon size={'big'} name={"facebook f"}/>
                            <Icon size={'big'}  name={'linkedin'}/>
                            <Icon size={'big'} name={"github"}/>
                        </div>
                    </div>
                </div>
                <img className={'about-img'} src={AboutContract} alt={'about us'}/>
            </div>
        </Layout>
)

export default AboutUs;