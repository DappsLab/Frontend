import React, {useState} from 'react';
import {Button, Icon, Segment} from "semantic-ui-react";

const TestLicenses = (props) => {
    const [showLicenses,setShowLicenses]=useState(false)
    const {user,logged_session,contract}=props
    const RenderTestLicenses=()=>{
        // const purchased=user.purchasedContracts;
        return <div>sdfsdf</div>
        // return <div> <Segment className={'licenses_header'}>
        //     <div>
        //         <h2 className={"flex"}>
        //             <Icon circular inverted color='blue' size={'large'}  name={'shopping cart'}/>
        //             Licenses
        //         </h2>
        //         {/*<span>Customization Left: {purchased[i].unlimitedCustomization?"Unlimited Customizations":purchased[i].customizationsLeft}</span>*/}
        //     </div>
        //     <div className={'flex'}>
        //         <span>{purchased[i].licenses.length}</span>
        //         <div onClick={()=>{setShowLicenses(!showLicenses)}}>
        //             <Icon link size={'large'} name={`chevron ${showLicenses?"up":"down"}`}/>
        //         </div>
        //     </div>
        // </Segment>
        //     { showLicenses&&purchased[i].licenses.map(license=>{
        //         return <div key={license.purchaseDateTime}>
        //             <div className={"licenses flex"} >
        //                 <Icon circular inverted color='blue'  name={'checkmark'}/>
        //                 <Segment className={'flex'}>
        //                     <div>
        //                         <h2>{license.order.licenseType}</h2>
        //                         <span>Order ID :{license.order.id}</span><br/>
        //                         <span>Purchased on {license.purchaseDateTime}</span>
        //                     </div>
        //                     <div>
        //                         {license.order.licenseType==="SINGLELICENSE" && license.used ?
        //                             ""
        //                             :<Button onClick={() => {
        //                                 props.history.push(`/compile/${license.id}`)
        //                             }}>Compile</Button>
        //                         }
        //                     </div>
        //                 </Segment>
        //             </div>
        //             {license.used?
        //                 <Segment className={"compiled"}>
        //                     <div>
        //                         <img src={license.order.smartContract.image} alt={"img"}/>
        //                         <h3>{license.order.smartContract.contractName}</h3>
        //                     </div>
        //                     <Button color={'green'} onClick={() => {
        //                         // this.props.history.push(`/compile/${license.id}`)
        //                     }}>Deploy</Button>
        //                 </Segment>:""
        //             }
        //         </div>
        //     })}
        // </div>
    }
    return (
        <div>
            {logged_session&& RenderTestLicenses()}
        </div>
    );
};

export default TestLicenses;