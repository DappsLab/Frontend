import "../assets/scss/upload_section.css"
import React from 'react';
import DashboardNav from '../components/ui/DashboardNav'
import Layout from "./Layout";
import "../assets/scss/dashboard.css"
import '../assets/scss/admin_verification.css'
const DashboardLayout =(props)=>{
    return (
        <Layout>
            <div className={"dashContainer flex"}>
                <DashboardNav user={props.user}/>
                <div className={'dash-right'}>
                    {props.children}
                </div>
            </div>
        </Layout>
    );
}

export default (DashboardLayout);

