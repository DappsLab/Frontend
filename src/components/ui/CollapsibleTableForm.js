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
import {dateTime} from "../../helpers/DateTimeConversion";
import {Button} from "semantic-ui-react";
import {
    verify_smart_contract,
    cancel_smart_contract,
    pendingSmartContract, getSource,
} from "../../queries/queries";
import {withAlert} from "react-alert";
import {useMutation, useQuery} from "@apollo/client";
import MEDitor from "@uiw/react-md-editor";
import {Controlled as CodeMirror} from 'react-codemirror2'
import {getDate} from "./Helpers";
import {Client} from "../../queries/Services";

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
    const [verify] = useMutation(verify_smart_contract, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        refetchQueries:mutationResult=>[{query:pendingSmartContract,context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }}],
        onCompleted:data=>{
            console.log(data)
        }
    });
    const [cancel]=useMutation(cancel_smart_contract, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        refetchQueries:mutationResult=>[{query:pendingSmartContract,context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        }],
        onCompleted:data=>{
            console.log(data)
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
            alert.error(error.toString(),{timeout:5000})
        })
    }
    const GetSources=(id)=>{
        const {loading,error,data}=useQuery(getSource,{
            variables:{id:id},context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            },
            client:Client
        });
        if (loading) return "Loading"
        if (error) return <div className={`errorMessage ${classes.error}`}>{error.toString()}</div>
        if (data) {
            return <CodeMirror
            value={data.getSource}
            options={{mode:'sol', lineNumbers: true,theme:'material'}}
            // onBeforeChange={(editor, data, value) => {
            //     this.setState({value});
            // }}
            />
        }
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
                    {row.contractName}
                </TableCell>
                <TableCell>{row.publisher.fullName}</TableCell>
                <TableCell><Button basic color='yellow'  size={"mini"} disabled >{row.verified}</Button></TableCell>
                <TableCell>{getDate(row.publishingDateTime)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={"kyc-details"} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Smart Contract Details
                            </Typography>
                            <div className={"contract-details"}>
                                <img   src={row.image}  alt={"img"}/>
                                <div className={"detial"}>
                                    <h2>Single Price {row.singleLicensePrice} Dapps</h2>
                                    <h2>Unlimited Price {row.unlimitedLicensePrice} Dapps</h2>
                                    <p>Short Description: {row.shortDescription}</p>
                                </div>
                                <div className={'description'}>
                                    <h3>Description</h3>
                                    <MEDitor.Markdown source={row.description}  />
                                </div>
                            </div>
                            <div className={'source-view flex'}>
                                <h3>
                                    Contract Function Name
                                  <span>  {row.sourceContractName}</span>
                                </h3>
                                {GetSources(row.id)}
                            </div>
                            <Button onClick={()=>onVerify(row.id)} color={'green'}>VERIFIED</Button>
                            <Button onClick={()=>onCancel(row.id)} color={'red'}>REJECTED</Button>
                            <Button onClick={()=>{props.history.push(`/edit_samrt_contract/${row.id}`)}}  color={"blue"}>EDIT</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


 function CollapsibleFormTable(props) {
    const {data}=props;
    return (
        <div className={'scroll'}>
        <TableContainer className={'contract-container'} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Contract Name</TableCell>
                        <TableCell>Publisher Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.id} {...props}  row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}
export default withAlert()(CollapsibleFormTable)