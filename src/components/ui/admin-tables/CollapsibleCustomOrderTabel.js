import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const CustomeOrderTabel = () => {
    const {data,fetch}=props;
    console.log(data)
    return (
        <div className={'scroll'}>
            <TableContainer className={'kyc-verification'} component={Paper}>
                <Table   aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Full Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Location</TableCell>
                            <TableCell >Created At</TableCell>
                        </TableRow>
                    </TableHead>
                    {/*<TableBody>*/}
                    {/*    {data.map((row) => (*/}
                    {/*        <Row fetch={fetch} key={row.id} {...props} row={row} />*/}
                    {/*    ))}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomeOrderTabel;
