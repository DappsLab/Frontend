import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class Transactions extends Component {
    render() {
        return (
            <AccountLayout>
                <div className={"transaction"}>
                    <h2>Transaction</h2>
                    <Paper   className={"fullWidth"}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </Table>
                        <div className={"transaction_result "}>No Transaction</div>
                    </Paper>
                </div>
            </AccountLayout>
        );
    }
}

export default Transactions;
