import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Button} from "semantic-ui-react";
import {
      cancelDapps, verifyDapps,
} from "../../../queries/queries";
import {withAlert} from "react-alert";
import {useMutation} from "@apollo/client";
import MEDitor from "@uiw/react-md-editor";
import {Client} from "../../../queries/Services";
import {getDate} from "../Helpers";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    error:{
        top:"0"
    }
});



function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [verify] = useMutation(verifyDapps, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        // refetchQueries:[{query:pendingDapps,context: {
        //         headers: {
        //             authorization: localStorage.getItem("token")
        //         }
        //     }
        // }],
        onCompleted:data=>{
            if (data){
                props.fetch();
            }
        }
    });
    const [cancel]=useMutation(cancelDapps, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        // refetchQueries:[{query:pendingDapps,context: {
        //         headers: {
        //             authorization: localStorage.getItem("token")
        //         }
        //     }
        // }],
        onCompleted:data=>{
            if (data){
                props.fetch();
            }
        }
    });
    const alert=props.alert;
    function onVerify(id) {
        verify({variables: {id:id}}).catch(error=>{
            alert.error(error.toString(),{timeout:5000})
        })
    }
    function onCancel(id){
        cancel({variables: {id:id}}).catch(error=>{
            alert.error(error.toString()+"new",{timeout:5000})
        })
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.dAppName}
                </TableCell>
                <TableCell>{row.publisher.fullName}</TableCell>
                <TableCell>{row.verified}</TableCell>
                <TableCell>{getDate(row.publishingDateTime)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={"kyc-details "}  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Smart Contract Details
                            </Typography>
                            <div className={'contract-details'}>
                                <img  src={row.image}   alt={"img"}/>
                                <div className={"detial"}>
                                    <h2>Single Price {row.singleLicensePrice} Dapps</h2>
                                    <div className={'flex'}> <h4>Categories: </h4> {row.dAppCategory.map(cate=> {return <span key={cate}> {cate} </span>} ) }</div>
                                    <div className={'flex'}><h4>Tags: </h4> {row.tags.map(tag=> {return <span key={tag}> #{tag} </span>} ) }</div>
                                    <p>Short Description: {row.shortDescription}</p>
                                </div>
                                <div className={'description'}>
                                    <h3>Description</h3>
                                    <MEDitor.Markdown source={row.description}  />
                                </div>
                            </div>
                            <Button onClick={()=>onVerify(row.id)} color={'green'}>VERIFIED</Button>
                            <Button onClick={()=>onCancel(row.id)} color={'red'}>REJECTED</Button>
                            <Button onClick={()=>{props.history.push(`/edit_dapp/${row.id}`)}}  color={"blue"}>EDIT</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function CollapsibleDappsTable(props) {
    const {data,fetch}=props;
    return(
        <div className={'scroll'}>
        <TableContainer className={'dapp-container'} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dapps Name</TableCell>
                        <TableCell>Publisher Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row fetch={fetch} key={row.id} {...props}  row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}
export default withAlert()(CollapsibleDappsTable)