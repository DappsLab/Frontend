import React from 'react';
import {ContractImg} from "../../ui/Icons";
import '../../../assets/scss/contract_card.css';
import {Link} from "react-router-dom";
import {graphql } from "react-apollo";
import {Label, Loader} from "semantic-ui-react";
import {getContract} from "../../../queries/queries";


const ContractCard =(props)=>{
   const returnColor=(color)=>{
        switch (color){
            case "TOOLS":
                return "orange";
            case "SOCIAl":
                return "grey";
            case "DOCUMENTS":
                return "teal";
            case "UTILITY":
                return "purple";
            case "ESCROW":
                return "blue";
            case "FINANCIAL":
                return "green";
            default:
                return "violet";
        }
    }

   const renderCategory=(categorys)=>(
        categorys.map(category=>{
            return  <Label  key={category}
                color={returnColor(category)}   className={`card_tag`} >
                {category}
                    {/*<Button.Content   visible>{category}</Button.Content>*/}
                    {/*<Button.Content  hidden>*/}
                    {/*    <FontAwesomeIcon  icon={returnIcon(category)}/>*/}
                    {/*</Button.Content>*/}
                 </Label>
        })
    )
   const displayContract=()=>{
        const data = props.data;
        if (data.loading){
            return <div className={"all-contract"}><Loader active size={"big"} content={"Loading Contract"}/></div>
        }
        if (data.error){
            return <div>{data.error.message}</div>
       }else {
            return data.smartContracts.map(contract=>{
                return <Link to={`/detailed_contract/${contract.id}`} className={"card flex"} key={contract.id}  >
                    <div className={"card-top flex"}>
                        <div className={"flex tags"}>
                            {renderCategory(contract.contractCategory)}
                        </div>
                        <ContractImg
                            position={"relative"}
                            imagePath={contract.image}
                            height={"120px"}
                            width={"120px"}
                         />
                    </div>
                    <h4>{contract.contractName}</h4>
                    <p>{contract.shortDescription}</p>
                    <span className={"block"}>{contract.singleLicensePrice} Dapps</span>
                </Link>
            })
        }
    }
    return (
        <div className={"flex contract-container"}>
            {displayContract()}
        </div>
    );

}

export default  graphql(getContract) (ContractCard);
