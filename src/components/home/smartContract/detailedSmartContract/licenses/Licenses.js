import React, {useState} from 'react';
import {Button, Icon, Segment} from "semantic-ui-react";

const Licenses = (props) => {
    const [showLicenses,setShowLicenses]=useState(false)
    const {user,logged_session,contract}=props

    console.log(user)
    const RenderLicenses=()=>{
        const purchased=user.purchasedContracts;
        if (purchased.length>0){
            for (let i=0;i<purchased.length;i++){
                if (purchased[i].smartContract.id===contract.id){
                    return <div> <Segment className={'licenses_header'}>
                        <div>
                            <h2 className={"flex"}>
                                <Icon  inverted color='blue' size={'large'}  name={'shopping cart'}/>
                                Licenses
                            </h2>
                            <span>Customization Left: {purchased[i].unlimitedCustomization?"Unlimited Customizations":purchased[i].customizationsLeft}</span>
                        </div>
                        <div className={'flex'}>
                            <span>{purchased[i].licenses.length}</span>
                            <div onClick={()=>{setShowLicenses(!showLicenses)}}>
                                <Icon link size={'large'} name={`chevron ${showLicenses?"up":"down"}`}/>
                            </div>
                        </div>
                    </Segment>
                        { showLicenses&&purchased[i].licenses.map(license=>{
                            return <div key={license.purchaseDateTime}>
                                <div className={"licenses flex"} >
                                    <Icon circular inverted color='blue'  name={'checkmark'}/>
                                    <Segment className={'flex'}>
                                        <div>
                                            <h2>{license.order.licenseType}</h2>
                                            <span>Order ID :{license.order.id}</span><br/>
                                            <span>Purchased on {license.purchaseDateTime}</span>
                                        </div>
                                        <div>
                                            {license.order.licenseType==="SINGLELICENSE" && license.used ?
                                                ""
                                                :<Button onClick={() => {
                                                   props.history.push(`/customize_smart_contract/${license.id}`)
                                                }}>Compile</Button>
                                            }
                                        </div>
                                    </Segment>
                                </div>
                                {license.used?
                                    <Segment className={"compiled"}>
                                        <div>
                                            <img src={license.order.smartContract.image} alt={"img"}/>
                                            <h3>{license.order.smartContract.contractName}</h3>
                                        </div>
                                        <Button color={'green'} onClick={() => {
                                            props.history.push(`/deploy_smart_contract/${license.id}`)
                                        }}>Deploy</Button>
                                    </Segment>:""
                                }
                            </div>
                        })}
                    </div>
                }
            }
        }
    }
    return (
        <div>
            {logged_session&& RenderLicenses()}
        </div>
    );
}
export default Licenses;