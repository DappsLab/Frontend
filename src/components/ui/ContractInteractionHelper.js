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
export const sendContractValue=async (contract,type,name,ownerAddress)=>{
    //const gasParice=await calculateGas(contract,name,address)
    //console.log(gasParice)
    try {
        let transfer=contract.methods[name]();
        let encodedABI = transfer.encodeABI();
        let tx = {
            from: ownerAddress,
            to:contract._address,
            gas:2000000,
            data:encodedABI
        };
        let signTx = await web3.eth.accounts.signTransaction(tx,"0x75d8c69d217d44bcd4f487e76a710ed093b946a6fe5e25e3ce39cfc725f315b2");
        let tran = web3.eth.sendSignedTransaction(signTx.rawTransaction)
        return "true"
    }catch (e) {
        console.log("error:",e.toString())
        return "Error"
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