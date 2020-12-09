import React, {useState} from 'react';
import {ContractImg} from "../../ui/Icons";
import {dateTime} from "../../../helpers/DateTimeConversion";
import {Button} from "semantic-ui-react";
import {Link} from 'react-router-dom'
import {cardColors, categoryColors} from "../../ui/Helpers";
import {getDapps} from "../../../queries/queries";
import {Spinner2} from "../../ui/Spinner";
import {graphql } from "react-apollo";


const DappsCard = (props) => {
    const [height, setHeight] = useState("1200px");
    const renderCategory = (categorys) => (
        categorys.map(category => {
            return <Button
                size={'mini'}
                key={category} style={{backgroundColor: `${categoryColors(category)}`}}
                className={`card_tag`}>
                {category}
            </Button>
        })
    )
    const data = props.data;
    if (data.loading) {
        return <Spinner2/>
    }
    if (data.error) {
        return <div>{data.error.message}</div>
    } else {
        const dapps = props.searchdata === null ? data.verifiedDApps : props.searchdata;
        return (
            <div>
                <div style={{height: `${dapps.length > 6 ? height : '820px'}`}} className={"flex card-container"}>
                    {dapps.map((dapp, index) => {
                        return <Link style={{backgroundColor: `${cardColors(index)}`}}
                                     to={`/dapps_details/${dapp.id}`} className={"card flex"} key={dapp.id}>
                            <div className={"card-top flex"}>
                                <ContractImg
                                    position={"relative"}
                                    imagePath={dapp.image}
                                    height={"100px"}
                                    width={"100px"}
                                />
                                <div className={"card-right"}>
                                    <h1>{dapp.dAppName}</h1>
                                    <span>Publish By </span>
                                    <span>{dapp.publisher.fullName}</span>
                                    <span> created at {dateTime(dapp.createdAt)}</span>
                                </div>
                            </div>
                            <p>{dapp.shortDescription}</p>
                            <div>
                                {renderCategory(dapp.dAppCategory)}
                            </div>
                            <span className={"block"}>{dapp.singleLicensePrice} Dapps</span>
                        </Link>
                    })}
                </div>
                {dapps.length > 8 &&
                <Button className={'see_more'} onClick={() => {
                    setHeight("auto")
                }}>See More</Button>
                }
            </div>
        );
    }
}

export default graphql(getDapps)(DappsCard)
