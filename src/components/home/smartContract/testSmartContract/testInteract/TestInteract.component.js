import React, {useState} from 'react';
import {
    callContract,
    loadContract,
    sendContractValue
} from "../../../../ui/ContractInteractionHelper";
import {useQuery} from "@apollo/client";
import {getTestABI} from "../../../../../queries/queries";
import {Client} from "../../../../../queries/Services";
import {CheckDimension, FormValidation} from "../../../../ui/mise";
import {recursiveChecker} from "../../../../ui/InputValidation";
import {withAlert} from "react-alert";

const TestIntract = (props) => {
    const [name,setName]=useState('');
    const [errors,setError]=useState(false)
    const [value,setValue]=useState('');
    const [payableValue,setPayableValue]=useState('');
    const [sendValue,setSendValue]=useState('');
    const [abi,setAbi]=useState();
    const [argument,setArgument]=useState([])
    const {newID,ownerAddress,ownerKey,contractAddress,alert}=props

    const onFunctionSubmit=async (targetArray,contract)=>{
        if (targetArray.stateMutability==='view') {
            let callData = await callContract(contract, targetArray, targetArray.name, ownerAddress);
            setValue(callData)
        }
        else if (targetArray.stateMutability==="nonpayable"){
            let callData = await sendContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress,'',0,argument);
            if (callData==='true'){
                alert.success("Funcation called Successfully",{timeout:1000})
            }else {
                alert.error(callData,{timeout:3000})
            }
        }else if (targetArray.stateMutability==="payable"||targetArray.payable){
            let callData = await sendContractValue(contract,ownerKey,targetArray.stateMutability ,targetArray.name,ownerAddress,payableValue,sendValue,argument);
            if (callData==='true'){
                alert.success("Funcation called Successfully",{timeout:1000})
            }else {
                alert.error(callData,{timeout:3000})
            }
        }
        setArgument([])
    }
    const handleSelect=(event)=>{
        const {value}=event.target;
        if (value==='Select Funtion'){
            setName('')
        }else {
            setName(value)
        }
    }
    const handleBlur=(event,index,name,ty)=>{
        const {value}=event.target;
        let array=[]
        const count=CheckDimension(ty);
        if (count===2){

        }else if (count===1){
            let split=value.split(',')
            for (let i=0;i<split.length;i++){
                array.push(split[i])
            }
        }else {
            array.push(value)
        }
        if (value.length>0) {
            if (recursiveChecker(ty,array)){
                setError(!errors)
            }else {
                setError(true)
                alert.error("INVALID_ARGUMENT", {timeout: 2000})
            }
        }else {
            setError(!errors)
        }
    }
    const handleChange=(event,index,inputArray)=>{
        const {value}=event.target
        let newArray;
        if (argument.length){
            newArray=argument
        }else {
            newArray=inputArray
        }
        newArray[index].data=value
        setArgument(newArray)
    }
    const renderData=(array,contract)=>{
        if (name.length>0) {
            let tagertArray,inputArray
            for (let i=0;i<array.length;i++){
                if (array[i].name===name){
                    tagertArray=array[i]
                    break;
                }
            }
            if (tagertArray.inputs.length>0){
                inputArray=tagertArray.inputs
            }
            return <div>
                {tagertArray.payable||tagertArray.stateMutability==='payable'?(
                    <form>
                        <label>Enter paybale Value</label>
                        <input type={'text'}  name={'payable'} value={payableValue} onChange={(event)=>{
                            setPayableValue(FormValidation(payableValue,event.target.value,event.target.name))
                        }}/>
                        <p>This funcation is payably</p>
                        <label>Enter Sender </label>
                        <input type={'text'} name={'send'} value={sendValue} onChange={(event)=>{
                            setSendValue(event.target.value)
                        }}/>
                        <p>This funcation is payably</p>
                    </form>
                ):""}
                {inputArray&&inputArray.length > 0 ? <form>
                    <h3>Function Input</h3>
                    {inputArray.map((array, index) => {
                        return <div className={'input-block'} key={index}>
                            <label>{array.name} ({array.type})</label>
                            <input type={'text'} name={array.name} onBlur={
                                (event) => handleBlur(event, index, array.name, array.type,)
                            } onChange={(event => {
                                handleChange(event,index,inputArray)
                            })}
                            />
                        </div>
                    })}
                </form> : ""
                }
                <button className={'Interact_button'} onClick={()=>onFunctionSubmit(tagertArray,contract)} >Execute</button>
            </div>
        }
    }
    const renderResult=(array)=>{
        if (value!=='') {
            let newValue = value.toString()
            if (newValue.search(',')) {
                let split=newValue.split(",")
                return <div className={'execute-result'}>
                    <h3>Result</h3>
                    {split.map((data,index) => {
                        return  <div key={index}>{data}</div>
                    })}
                </div>
            }
            // let tagertArray
            // for (let i=0;i<array.length;i++){
            //     if (array[i].name===name){
            //         tagertArray=array[i]
            //         break;
            //     }
            // }
         return   <div className={'execute-result'}>
             <h3>Result</h3>
                {value}
            </div>
        }
    }
    const {data,error,loading}=useQuery(getTestABI,{
        client:Client,
        context:{
            headers:{
                authorization:localStorage.getItem('token')
            }
        },variables:{
            id:newID
        },onError:error1 => {
            console.log(error1.toString())
            // props.setLoading(false)
        },onCompleted:data1 => {
            setAbi(data1.testGetABI)
        }
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.toString()}</p>
    if (data&&!loading&&abi) {
       let contract=loadContract(abi, contractAddress)
        console.log(contract)
        // const inputArr=getObjects(JSON.parse(abi),"type","function");
        const functionArrays=contract._jsonInterface;
        return <div>
            <form>
                <select onClick={(event)=>handleSelect(event)}>
                    <option>Select Funtion</option>
                    {
                        functionArrays.map(((functionArr,index)=>(
                            <option key={index} >{functionArr.name}</option>
                        )))
                    }
                </select>
            </form>
            {renderData(functionArrays,contract)}
            {renderResult(functionArrays)}
        </div>
    }
    return (
        <div>Error Refresh</div>
    );
};

export default withAlert() (TestIntract);
