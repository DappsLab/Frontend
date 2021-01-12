import Web3 from "web3";

let web3=new Web3('http://localhsot:7546')

export const   loadContract= (abi,contractAddress)=> {
    return new web3.eth.Contract(JSON.parse(abi), contractAddress);
}