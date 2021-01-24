import Web3 from "web3";

let web3=new Web3('http://127.0.0.1:7546')

export const   loadContract= (abi,contractAddress)=> {
    return new web3.eth.Contract(JSON.parse(abi), contractAddress);
}
export const callContract=async (contract,functionArr,name,address)=>{
    let contractMethod
    try {
        contractMethod = await contract.methods[name]().call({from:address});
    }catch (e) {
        console.log("error:",e.toString())
    }
    return contractMethod
}
export const sendContractValue=async (contract,ownerKey,type,name,ownerAddress,payableValue,sendValue,argument)=>{
    //const gasParice=await calculateGas(contract,name,address)
    //console.log(gasParice)
    let payableConvertedValue,checkedSenderValue=''
    if (payableValue){
        payableConvertedValue=toWei(payableValue)
        checkedSenderValue=isAddress(sendValue)?sendValue:""
    }else {
        payableConvertedValue=toWei(0)
    }
    const data = [];
    for (let i=0;i<argument.length;i++){
        let object={}
        object['data']=argument[i].data
        data.push(object)
    }
    const finalArgument = data.map(
        function({data}) {
            return data;
        }
    );
    try {
        let transfer=contract.methods[name](...finalArgument);
        let encodedABI = transfer.encodeABI();
        let tx = {
            from: ownerAddress,
            to:contract._address,
            gas:2000000,
            data:encodedABI,
            value:payableConvertedValue,
            sender:checkedSenderValue,
        };
        let signTx = await web3.eth.accounts.signTransaction(tx,ownerKey);
        let tran = web3.eth.sendSignedTransaction(signTx.rawTransaction)
        console.log('transaction',tran)
        return "true"
    }catch (e) {
        // console.log("error:",e.toString())
        return e.toString()
    }
}

export const calculateGas= async (contract,name,address)=>{
    let gasPrice
    try {
        gasPrice = await contract.methods[name]().estimateGas({from:address});
    }catch (e) {
        console.log("error:",e.toString())
    }
    return gasPrice
}
export const getContractBalance= async (address)=>{
    let balance
    try {
        balance= await web3.eth.getBalance(address);
    }catch (err){
        console.log(err.toString())
    }
    return balance;
}


//==============================================================
//                             Main
//==============================================================
let mainWeb3=new Web3('http://127.0.0.1:7545')
export const   loadMainContract= (abi,contractAddress)=> {
    return new mainWeb3.eth.Contract(JSON.parse(abi), contractAddress);
}
export const callMainContract=async (contract,functionArr,name,ownerAddress)=>{
    let contractMethod
    try {
        contractMethod = await contract.methods[name]().call({from:ownerAddress});
    }catch (e) {
        console.log("error:",e.toString())
    }
    return contractMethod
}
export const sendMainContractValue=async (contract,ownerKey,type,name,ownerAddress,payableValue,sendValue,argument)=>{
    let payableConvertedValue,checkedSenderValue=''
    if (payableValue){
        payableConvertedValue=toWei(payableValue)
        checkedSenderValue=isAddress(sendValue)?sendValue:""
    }else {
        payableConvertedValue=toWei(0)
    }
    //const gasParice=await calculateGas(contract,name,address)

    const data = [];
    for (let i=0;i<argument.length;i++){
        let object={}
        object['data']=argument[i].data
        data.push(object)
    }
    const finalArgument = data.map(
        function({data}) {
            return data;
        }
    );
    try {
        let transfer=contract.methods[name](...finalArgument);
        let encodedABI = transfer.encodeABI();
        let tx = {
            from: ownerAddress,
            to:contract._address,
            data:encodedABI,
            gas:2000000,
            value:payableConvertedValue,
            sender:checkedSenderValue,
        };
        let signTx = await mainWeb3.eth.accounts.signTransaction(tx,ownerKey);
        await mainWeb3.eth.sendSignedTransaction(signTx.rawTransaction);
        return "true"
    }catch (err) {
        return err.toString()
    }
}

export const calculateMainGas= async (contract,name,address)=>{
    let gasPrice
    try {
        gasPrice = await contract.methods[name]().estimateGas({from:address});
    }catch (e) {
        console.log("error:",e.toString())
    }
    return gasPrice
}
export const getMainContractBalance= async (address)=>{
    let balance
    try {
        balance= await mainWeb3.eth.getBalance(address);
    }catch (err){
        console.log(err.toString())
    }
    return balance;
}
export const toWei=  (eth)=>{
    return eth*1000000000000000000;
}
export const isAddress =  (address) => {
    return web3.utils.isAddress(address);
}