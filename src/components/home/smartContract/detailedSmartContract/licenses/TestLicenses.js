import React, {useState} from 'react';
import {Button, Icon, Segment} from "semantic-ui-react";

const TestLicenses = (props) => {
    const [showLicenses,setShowLicenses]=useState(false)
    const {user,logged_session,contract}=props

    const RenderTestLicenses=()=> {
        const purchased = user.testPurchasedContracts;
        if (purchased.length > 0) {
            for (let i = 0; i < purchased.length; i++) {
                if (purchased[i].smartContract.id === contract.id) {
                    console.log(purchased[i])
                    return <div><Segment className={'licenses_header'}>
                        <div>
                            <h2 className={"flex"}>
                                <Icon circular inverted color='blue' size={'large'} name={'shopping cart'}/>
                                Test Licenses
                            </h2>
                            {/*<span>Customization Left: {purchased[i].unlimitedCustomization?"Unlimited Customizations":purchased[i].customizationsLeft}</span>*/}
                        </div>
                        <div className={'flex'}>
                            <span>{purchased[i].testLicenses.length}</span>
                            <div onClick={() => {
                                setShowLicenses(!showLicenses)
                            }}>
                                <Icon link size={'large'} name={`chevron ${showLicenses ? "up" : "down"}`}/>
                            </div>
                        </div>
                    </Segment>
                        { showLicenses&&purchased[i].testLicenses.map(license=>{
                            return <div key={license.purchaseDateTime}>
                                <div className={"licenses flex"} >
                                    <Icon circular inverted color='blue'  name={'checkmark'}/>
                                    <Segment className={'flex'}>
                                        <div>
                                            <h2>{license.testOrder.licenseType}</h2>
                                            <span>Order ID :{license.testOrder.id}</span><br/>
                                            <span>Purchased on {license.purchaseDateTime}</span>
                                        </div>
                                        <div>
                                            {license.testOrder.licenseType==="SINGLELICENSE" && license.used ?
                                                ""
                                                :<Button onClick={() => {
                                                    props.history.push(`/test_smart_contract/${license.id}`)
                                                }}>Compile</Button>
                                            }
                                        </div>
                                    </Segment>
                                </div>
                                {license.used?
                                    <Segment className={"compiled"}>
                                        <div>
                                            <img src={license.testOrder.smartContract.image} alt={"img"}/>
                                            <h3>{license.testOrder.smartContract.contractName}</h3>
                                        </div>
                                        <Button color={'green'} onClick={() => {
                                            this.props.history.push(`/compile/${license.id}`)
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
            {logged_session&& RenderTestLicenses()}
        </div>
    );
};

export default TestLicenses;