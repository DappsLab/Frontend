import React from 'react';
import {Button, Icon, Table} from "semantic-ui-react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {dateTime} from "../../../ui/DateTimeConversion";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import {useRowStyles} from "../../../ui/mise";


const CustomOrderRow = ({orders}) => {
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.businessName}
                    </TableCell>
                    <TableCell>{row.businessEmail}</TableCell>
                    <TableCell>{row.businessPhone}</TableCell>
                    <TableCell>{dateTime(row.createdAt)}</TableCell>
                    <Table.Cell>
                        <Button disabled className={'remove-opacity'} basic color={row.status==="VERIFIED"?"green":(row.status==="PENDING"?"yellow":'red')}> {row.status}</Button>
                    </Table.Cell>
                    <Table.Cell className={'action'}  >
                             {/*{order.status!=="VERIFIED"&&<Link to={`/edit_custom_order/${order.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>}*/}
                             <span> <Icon circular link  inverted color='red' name='delete'/></span>
                    </Table.Cell>
                </TableRow>
                <TableRow>
                    <TableCell className={"kyc-details"} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Custom Order Details
                                </Typography>
                                <Table size="small"  aria-label="purchases">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Business Name: </strong>{row.businessName}</TableCell>
                                            <TableCell><strong>Business Email: </strong> {row.businessEmail}</TableCell>
                                            <TableCell><strong>Business Phone: </strong> {row.businessPhone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Product Type :</strong> {row.productType}</TableCell>
                                            <TableCell><strong>Website Link :</strong> {row.businessWebsite}</TableCell>
                                            <TableCell><strong>Created At : </strong> {dateTime(row.createdAt)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4}><strong>Requirement : </strong> {row.requirements}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
    return (
        <div className={'scroll'}>
            <Table className={"violet developed striped "} >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell >Business Name</Table.HeaderCell>
                        <Table.HeaderCell >Business Email</Table.HeaderCell>
                        <Table.HeaderCell >Phone No.</Table.HeaderCell>
                        <Table.HeaderCell >Website</Table.HeaderCell>
                        <Table.HeaderCell >Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
               <Table.Body>
                   {orders.length>0&&orders.map((order,index)=>(
                       <Row key={order.id} row={order}/>
                       // <Table.Row key={order.id} >
                       //     <Table.Cell>{index+1}</Table.Cell>
                       //     <Table.Cell width={3}>{order.businessName}</Table.Cell>
                       //     <Table.Cell width={2}>{order.businessEmail}</Table.Cell>
                       //     <Table.Cell width={2}>{order.businessPhone}</Table.Cell>
                       //     <Table.Cell width={3}>{order.businessWebsite}</Table.Cell>
                       //     <Table.Cell width={1} >
                       //         <Button disabled className={'remove-opacity'} basic color={order.status==="VERIFIED"?"green":(order.status==="PENDING"?"yellow":'red')}> {order.status}</Button>
                       //     </Table.Cell>
                       //     <Table.Cell className={'action flex'}  width={1}>
                       //         {/*{order.status!=="VERIFIED"&&<Link to={`/edit_custom_order/${order.id}`}><Icon circular  link  inverted color='green' name='edit'/></Link>}*/}
                       //         <span> <Icon circular link  inverted color='red' name='delete'/></span>
                       //     </Table.Cell>
                       // </Table.Row>
                   ))
                   }
               </Table.Body>
            </Table>
            {!orders.length>0&&<div className={'zero-result'}>
                {orders.length > 0 ? "" : "0 Orders Found"}
            </div>}
        </div>
    );
};

export default CustomOrderRow;
