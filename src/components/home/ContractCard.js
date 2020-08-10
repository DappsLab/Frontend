import React from 'react';
import {ContractImg} from "../ui/Icons";
import '../../assets/scss/contract_card.css'

const ContractCard = () => {
    const contractList=[
        { check:false,title:"Contract Name", detail:"Lorem Ipsum is simply dummy\n" +
                "                text of the printing and typesetting\n" +
                "                industry. Lorem Ipsum has been\n" +
                "                the industry's standard dummy text\n" +
                "                ever since the 1500s,when an unknown\n" +
                "                printer took a galley of type " ,price:"1000 pkr"},
        {check:true, title:"Custom Contract", detail:"Lorem Ipsum is simply dummy\n" +
                "                text of the printing and typesetting\n" +
                "                industry. Lorem Ipsum has been\n" +
                "                the industry's standard dummy text\n" +
                "                ever since the 1500s,when an unknown\n" +
                "                printer took a galley of type " ,price:"1000 pkr"}
    ]
    const renderCards=()=>(
        contractList.map(contract=>(
        <card className={"card"}>
            <ContractImg
                check={contract.check}
                height={"100px"}
                width={"100px"}
            />
            <h4>{contract.title}</h4>
            <p>{contract.detail}</p>
            <span className={"block"}>{contract.price}</span>
        </card>
        ))
    );
    return (
        <div className={"flex contract-container"}>
            {renderCards()}
        </div>
    );
};

export default ContractCard;
