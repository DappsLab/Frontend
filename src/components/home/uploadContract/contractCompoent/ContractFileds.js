import React from 'react';
import {Form, Input} from "semantic-ui-react";
import {FormValidation} from "../../../ui/mise";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {categoryOption} from "../../../ui/Helpers";

export const ContractName = (props) => {
    const {cName,contract,setcName}=props
    return (
        <Form.Field>
            <label>Contract Name:</label>
            <Input
                type={'text'} placeholder={contract&&contract.contractName}
                value={cName} name={"cName"}
                onChange={(event,{value,name})=>setcName(FormValidation(cName,value,name))}/>
            <p className={"info"}>This will show in the list as the title</p>
        </Form.Field>
    );
};
export const OneLicense=(props)=>{
    const {onePrice,contract,setonePrice}=props
    return (
        <Form.Field>
            <label >Price per License</label>
            <Input
                fluid size={'large'} value={onePrice}
                label={{ basic: true, content: 'Dapps' }}
                name={"onePrice"} placeholder={contract&&contract.singleLicensePrice}
                onChange={(event,{value,name})=>setonePrice(FormValidation(onePrice,value,name))}/>
        </Form.Field>
    )
}

export const UnlimitedLicense=(props)=>{
    const {uPrice,contract,setuPrice}=props
    return (
        <Form.Field>
            <label>Unlimited License</label>
            <Input
                fluid size={'large'} value={uPrice}
                label={{ basic: true, content: 'Dapps' }}
                name={"uPrice"} placeholder={contract&&contract.unlimitedLicensePrice}
                onChange={(event,{value,name})=>setuPrice(FormValidation(uPrice,value,name))}/>
        </Form.Field>
    )
}
export const ContractCategory=(props)=>{
    const {category,setCategory,contract}=props
    return (
        <Form.Field>
            <label>Contract Category:</label>
            <Select
                components={makeAnimated()}
                isMulti
                size={'large'}
                value={category}
                placeholder={contract&&contract.contractCategory}
                onChange={(value)=>{setCategory(value)}}
                name="contractCategory"
                options={categoryOption}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            <p className={"info"}>What categories suits your contract</p>
        </Form.Field>
    )
}
export const FuncationName=(props)=>{
    const {funcationName,contract,setfuncationName}=props
    return (
        <Form.Field>
            <label>Contract Funcation Name</label>
            <Input
                fluid type={'text'} name={'funcationName'} value={funcationName}
                placeholder={contract&&contract.sourceContractName}
                onChange={(event,{value,name})=>setfuncationName(value)}/>
            <p className={'info'}>Enter the Exact  Name of funcation Which you used in Contract </p>
        </Form.Field>
    )
}