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
export const HomeBlockChain=()=>(
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
            <img alt={'group'} src={group}/>
        </div>
    </section>
)
export const OurSmartContract=(props)=>(
    <section className={"our-contract flex"}>
        <div className={"s-right"}>
            <img alt={'our contract'} src={ourcontract}/>
        </div>
        <div className={"s-left" }>
            <h2>Our <span>Smart Contracts</span></h2>
            <p className="para1"> A smart contract is a code that runs inside blockchain. The contract can be written
                in different programming languages and for different blockchains.
                Now DappsLab platform provides smart contract uploading to Ethereum written on Solidity language.
            </p>
            <button className={'strock'} onClick={()=>{props.history.push('/smart_contracts')}}>Explore Smart Contracts</button>
        </div>
    </section>
)

export const CustomSmartContractInfo=(props)=>(
    <section className="custom-contract flex">
        <div className="c-left">
            <h2><span>Custom</span> Smart Contracts</h2>
            <p>
                If you did not find your required Smart Contract then you can place request for new smart contract
                When the request is live, the developers in our community will be notified, and they can start working
                on it right away. If multiple solutions are submitted, we can assist you in selecting a winner.
            </p>
            <button onClick={()=>{props.history.push('/request_smart_contract')}} className="strock cursor">Request Smart Contract</button>
        </div>
        <div className="c-right">
            <img  alt={'group'} src={group2}/>
        </div>
    </section>
)

export  const  Decentralized=(props)=>(
    <section className="decentralized flex">
        <h2>Decentralized <span>Application</span></h2>
        <p>Decentralized applications (dApps) are digital applications or programs that exist and run on a blockchain.
            A standard web app, such as Uber or Twitter, runs on a computer system which is owned and operated by an organization,
            giving it full authority over the app and its workings. There may be multiple users on one side, but the
            backend is controlled by a single organization.
            DApps can run on  a blockchain network.dApps run on a blockchain network in a public, open source, decentralized
            environment and are free from control and interference by any single authority.
        </p>
        <button onClick={()=>{props.history.push('/dapps')}} className={'strock cursor'}>Explore Dapss</button>
    </section>
)
