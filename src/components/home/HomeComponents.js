import React from 'react';
import ourcontract from '../../assets/images/group5.png'
import group from '../../assets/images/Group4.png'
import group2 from '../../assets/images/group6.png'
export const HomeBanner = () => {
    return (
        <section className={'dappslab_banner home_banner'}>
            <h1>Explore
                <span> Smart Contract & Dapps </span>
                 at Dapps<span>lab</span>
            </h1>
            <p>
                Real data integrity become possible now with our pantented hybrid
                blockchain-database middleware
            </p>
        </section>
    );
};
export const HomeBlockChain=()=>{
    return(
    <section className="home_blockchain">
            <div className="b-left">
                <h2>Dappslab <span> Blockchain</span></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                </p>
            </div>
            <div className="b-right">
                <img alt={''} src={group}/>
            </div>
    </section>
    )
}
export const OurSmartContract=(props)=>{
    return(
        <section className={"our-contract flex"}>
            <div className={"s-right"}>
                <img  src={ourcontract}/>
            </div>
            <div className={"s-left" }>
                <h2>Our <span>Smart Contracts</span></h2>
                <p className="para1"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <button className={'strock'} onClick={()=>{props.history.push('/smart_contracts')}}>Explore Smart Contracts</button>
            </div>
        </section>
    )
}
export const CustomSmartContractInfo=(props)=>{
    return(
        <section className="custom-contract flex">
            <div className="c-left">
                <h2><span>Custom</span> Smart Contracts</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam.
                </p>
                <button onClick={()=>{props.history.push('/request_smart_contract')}} className="strock cursor">Request Smart Contract</button>
            </div>
            <div className="c-right">
                <img  src={group2}/>
            </div>
        </section>
    )
}
export  const  Decentralized=(props)=>{
    return(
        <section className="decentralized flex">
            <h2>Decentralized <span>Application</span></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris et dolore magna aliqua. Ut enim ad minim veniam, et dolore magna aliqua. Ut enim ad minim veniam,
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit et dolore magna aliqua. Ut enim ad minim veniam, et dolore magna aliqua. Ut enim ad minim veniam,
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt et dolore magna aliqua. Ut enim ad minim veniam, et dolore magna aliqua. Ut enim ad minim veniam,
                in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button onClick={()=>{props.history.push('/dapps')}} className={'strock cursor'}>Explore Dapss</button>
        </section>
    )
}