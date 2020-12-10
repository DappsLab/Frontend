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
     getSource, cancelDapps, pendingDapps, verifyDapps,
} from "../../queries/queries";
import {withAlert} from "react-alert";
import {useMutation, useQuery} from "@apollo/client";
import MEDitor from "@uiw/react-md-editor";
import {Controlled as CodeMirror} from 'react-codemirror2'
import Avatar from "@material-ui/core/Avatar";
import {Client} from "../../queries/Services";
import {getDate} from "./Helpers";

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
        refetchQueries:[{query:pendingDapps,context: {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        }],
        onCompleted:data=>{
            console.log(data)
        }
    });
    const [cancel]=useMutation(cancelDapps, {
        context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        },
        client:Client,
        refetchQueries:[{query:pendingDapps,context: {
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
            variables:{id:id}
        });
        if (loading) return "Loading"
        if (error) return <div className={`errorMessage ${classes.error}`}>{error.toString()}</div>
        return data.getSource
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Smart Contract Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell  style={{ width: 220 }}>Image</TableCell>
                                        <TableCell><Avatar src={row.image} style={{borderRadius:0}} height={"80px"} width={"80px"} alt={"img"}/></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Single Price</TableCell>
                                        <TableCell>{row.dAppCategory.map(cate=> {return <span key={cate}> {cate} </span>} ) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Single Price</TableCell>
                                        <TableCell>{row.singleLicensePrice} Dapps</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Single Price</TableCell>
                                        <TableCell>{row.tags.map(tag=> {return <span key={tag}> #{tag} </span>} ) }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Cntract Source </TableCell>
                                        <TableCell>
                                            {/*<CodeMirror*/}
                                            {/*    value={GetSources(row.id)}*/}
                                            {/*    options={{mode:'sol', lineNumbers: true,theme:'material'}}*/}
                                            {/*    // onBeforeChange={(editor, data, value) => {*/}
                                            {/*    //     this.setState({value});*/}
                                            {/*    // }}*/}
                                            {/*/>*/}
                                            {/*<MEDitor.Markdown source={GetSources(row.id)}  />*/}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Short Description</TableCell>
                                        <TableCell>{row.shortDescription}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ width: 220 }}>Description</TableCell>
                                        <TableCell>
                                            <MEDitor.Markdown source={row.description}  />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button onClick={()=>onVerify(row.id)} color={'green'}>Verified</Button>
                            <Button onClick={()=>onCancel(row.id)} color={'red'}>Rejected</Button>
                            <Button onClick={()=>{props.history.push(`/edit_dapp/${row.id}`)}}  color={"blue"}>Edit</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function CollapsibleDappsTable(props) {
    const {data}=props;
    return (
        <TableContainer component={Paper}>
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
                        <Row key={row.id} {...props}  row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default withAlert()(CollapsibleDappsTable)