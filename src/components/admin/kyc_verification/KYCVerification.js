import React, { useEffect, useState} from 'react';
import {withAlert} from "react-alert";
import {Spinner2} from "../../ui/Spinner";
import {graphql } from "react-apollo";
import {lodash as compose} from 'lodash'
import {pendingKYC} from "../../../queries/queries";



const KycVerification =(props)=> {

    const [data,setData]=useState();

    return props.data.loading?<Spinner2/>:(
        <div>
            sfsd
            {/*{loading?<Spinner2/> :*/}
            {/*     data.map(da=>{*/}
            {/*        return <div key={da.id}>{da.fullName}</div>*/}
            {/*    })*/}
            {/*}*/}
        </div>
    );
}

export default compose(graphql(pendingKYC),withAlert())(KycVerification);