import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import {ContractImg} from "../ui/Icons";

const ContractCard = () => {
    const useStyle=makeStyles({
        root:{
            maxWidth:345,
            margin:'0'
        },
        container:{
          display:'flex'
        },
    });
    const classes = useStyle();
    return (
        <div className={classes.container}>
            <Card className={classes.root}>
                <ContractImg
                    height={"70px"}
                    width={"70px"}
                />
                <h4>Contract Name</h4>
                <p>Lorem Ipsum is simply dummy
                    text of the printing and typesetting
                    industry. Lorem Ipsum has been
                    the industry's standard dummy text
                    ever since the 1500s,when an unknown
                    printer took a galley of type </p>
                <span>1000 pkr</span>
            </Card>
        </div>
    );
};

export default ContractCard;