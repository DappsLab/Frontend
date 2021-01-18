import React, {useState} from 'react';
import {ContractImg} from "../../ui/Icons";
import '../../../assets/scss/contract_card.css';
import {Link} from "react-router-dom";
import {graphql } from "react-apollo";
import {Button} from "semantic-ui-react";
import {getContract} from "../../../queries/queries";
import {cardColors, categoryColors, getDate} from "../../ui/Helpers";
import {Spinner2} from "../../ui/Spinner";


const ContractCard =(props)=>{
    const [height,setHeight]=useState("1200px");
    const renderCategory=(categorys)=>(
        categorys.map(category=>{
            return  <Button size={'mini'}
                key={category}  style={{backgroundColor:`${categoryColors(category)}`}}
                className={`card_tag`} >
                {category}
            </Button>
        })
    )
   const displayContract=()=>{
        const data = props.data;
       console.log(data)
        if (data.loading){
            return <Spinner2/>
        }
        if (data.error){
            return <div>{data.error.message}</div>
       }else {
            const smartContract=props.searchdata===null?data.verifiedSmartContracts:props.searchdata;
           return <div>
            <div style={{ height: `${smartContract.length>6?height:'820px'}`}} className={"flex card-container"}>
                   {smartContract.map((contract, index) => {
                       return <Link style={{backgroundColor: `${cardColors(index)}`}}
                                    to={`/detailed_contract/${contract.id}`} className={"card flex"} key={contract.id}>
                           <div className={"card-top flex"}>
                               <ContractImg
                                   position={"relative"}
                                   imagePath={contract.image}
                                   height={"100px"}
                                   width={"100px"}
                               />
                               <div className={"card-right"}>
                                   <h1>{contract.contractName}</h1>
                                   <span>Publish By </span>
                                   <span>{contract.publisher.fullName}</span>
                                   <span> created at {getDate(contract.publishingDateTime)}</span>
                               </div>
                           </div>
                           <p>{contract.shortDescription}</p>
                           <div>
                               {renderCategory(contract.contractCategory)}
                           </div>
                           <span className={"block"}>{contract.singleLicensePrice} Dapps</span>
                       </Link>
                   })}
           </div>
               {smartContract.length>8&&
               <Button className={'see_more'} onClick={() => {
                   setHeight("auto")
               }}>See More</Button>
               }
           </div>

        }
    }
    return (displayContract());

}

export default  graphql(getContract,{ options: (props) => {
        return {
            refetchQueries:getContract,
            fetchPolicy:'network-only'
        }
    }}) (ContractCard);
