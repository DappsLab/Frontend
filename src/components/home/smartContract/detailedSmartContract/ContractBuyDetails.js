import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Divider, Form,Select, Input} from "semantic-ui-react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Slider} from "react-semantic-ui-range";
import BuySmartContract from "./BuySmartContract";
import BuyTestSmartContract from "./BuyTestSmartContract";
import {useQuery} from "@apollo/client";
import {me_Query} from "../../../../queries/queries";
import {Client} from "../../../../queries/Services";

const ContractBuyDetails = (props) => {
    const [radioValue,setradioValue]=useState("SINGLELICENSE");
    const [fee,setFee]=useState(100000);
    const [address,setAddress]=useState("");
    const {logged_session,user,contract}=props;
    const handleChange = (event) => {
        setradioValue(event.target.value)
    };
    const feeProcessTime=()=>{
        if (fee<300000){
            return " Maximum time"
        }else if (fee<700000){
            return " Medium time"
        }else {
            return " Minimum time"
        }
    }
    const RenderButtonGroup=()=> {
        const {loading, error,refetch, data} = useQuery(me_Query, {
            client: Client, context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            },
            onCompleted:data1 => {
                props.setUser(data1.me)
            },onError:error1 => {
                console.log(error1.toString())
            }
        })
        if (error){
            console.log(error.toString())
        }
        if (data) {
            return (
                <div className={`btnGroups`}>
                    <BuySmartContract
                        contract={contract} refetch={refetch} user={user} type={radioValue} fee={fee}
                        logged_session={logged_session}{...props}
                    />
                    <BuyTestSmartContract
                        contract={contract} refetch={refetch} user={user} type={radioValue} fee={fee}
                        logged_session={logged_session} {...props} address={address}
                    />
                </div>
            )
        }
    }
    const handleSelect=(event)=>{
        const {value}=event.target;
        if (value==="select"){
            setAddress('')
        }else {
            setAddress(value)
        }
    }
    return (
        <div className={"contractRight"}>
            <h3 className={"buy-top"}><span>Buy</span></h3>
            <div className={"flex"}>
                <FontAwesomeIcon className={"checkCircle"} icon={faCheckCircle}/>
                <p>Reviewed by Dappslab</p>
            </div>
            <h4>Price</h4>
            <FormControl component="fieldset" className={"fullWidth"}>
                <RadioGroup aria-label="Price" name="price" onChange={handleChange} value={radioValue}>
                    <Form className={"radio_detials"}>
                        <Form.Field className={"flex"}>
                            <FormControlLabel className={"radio"} value={"SINGLELICENSE"} control={<Radio />}   label={""}/>
                            <Input
                                fluid size={'large'} name={"SINGLELICENSE"}
                                disabled label={{ basic: true, content: 'Dapps' }}
                                value={contract.singleLicensePrice}/>
                        </Form.Field>
                        <Form.Field className={" flex"}>
                            <FormControlLabel className={"radio"}  value={"UNLIMITEDLICENSE"} control={<Radio />}   label={""}/>
                            <Input
                                fluid size={'large'} name={"UNLIMITEDLICENSE"}
                                disabled label={{ basic: true, content: 'Dapps' }}
                                value={contract.unlimitedLicensePrice}/>
                        </Form.Field>
                        <Divider/>
                        <Form.Field className={"slider flex"}>
                            <label>Set fee</label>
                            <Form.Group>
                                <Slider
                                    color="green"
                                    inverted={false}
                                    settings={{
                                        start: 100000,
                                        min: 30000,
                                        max: 999999,
                                        step: 200,
                                        onChange: value => {
                                            setFee(value)
                                        }
                                    }}
                                />
                                <p>This is the most amount of money that might be used to process this
                                    transaction. Your transaction will be processed in the
                                    <span>{feeProcessTime()}</span>
                                </p>
                            </Form.Group>
                        </Form.Field>
                        <Form.Field>
                            <label>Total amount</label>
                            <Input
                                fluid size={'large'}
                                disabled label={{ basic: true, content: 'Dapps' }}
                                value={radioValue==="UNLIMITEDLICENSE"?
                                    contract.unlimitedLicensePrice
                                    :contract.singleLicensePrice}
                            />
                        </Form.Field>
                        <Form.Field >
                            <label>Fee</label>
                            <Input
                                fluid size={'large'}
                                disabled label={{ basic: true, content: 'Wei' }}
                                value={fee}
                            />
                        </Form.Field>
                    </Form>
                </RadioGroup>
            </FormControl>
            {logged_session&&(
                user.testAddress.length>0&&
                    <form className={'test-address'}>
                        <label>Select Test Address</label>
                        <select
                            placeholder='Select Address' className={'strock'}
                            onChange={(event)=>handleSelect(event)}
                        >
                            <option  value={'select'}>Select Address</option>
                            { user.testAddress.map(add => (
                                <option key={add.id}  value={add.id}>{add.address}  ({Math.trunc(add.balance)})</option>
                            ))}
                        </select>
                            <p className={'info'}>Only Select When you want test smart contracty</p>
                    </form>
            )}
            {logged_session&&
                 RenderButtonGroup()
            }
        </div>
    );
};

export default ContractBuyDetails;