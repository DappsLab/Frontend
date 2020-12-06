import React from 'react';
import {Icon} from "semantic-ui-react";

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
        <section className={'home_blockchain'}>
            <h2>Dappslab <span>BLockchain</span></h2>
        </section>
    )
}

