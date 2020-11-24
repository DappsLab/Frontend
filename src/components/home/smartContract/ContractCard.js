import React from 'react';
import {ContractImg} from "../../ui/Icons";
import '../../../assets/scss/contract_card.css';
import {Link} from "react-router-dom";
import {graphql } from "react-apollo";
import {Button, Loader} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTools,faWrench,faInfo,faFile,faShareAltSquare} from "@fortawesome/free-solid-svg-icons";
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
   const returnIcon=(icon)=>{
        switch (icon){
            case "TOOLS":
                return faWrench;
            case "SOCIAl":
                return faShareAltSquare;
            case "DOCUMENTS":
                return faFile;
            case "UTILITY":
                return faTools;
            case "ESCROW":
                return faInfo;
            case "FINANCIAL":
                return faInfo;
            default:
                return faShareAltSquare;
        }
    }
   const renderCategory=(categorys)=>(
        categorys.map(category=>{
            return <Button color={returnColor(category)}  key={category} className={"tag"} animated>
                <Button.Content   visible>{category}</Button.Content>
                <Button.Content  hidden>
                   <FontAwesomeIcon  icon={returnIcon(category)}/>
                </Button.Content>
            </Button>
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
                return <Link className={"card flex"} key={contract.id} to={`/detailed_contract/${contract.id}`}>
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
                    <span className={"block"}>{contract.singleLicensePrice}</span>
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
