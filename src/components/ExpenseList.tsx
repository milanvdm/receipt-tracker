import React from 'react';
import { connect } from 'react-redux';
import { Box, Table, TableBody, TableRow, TableCell } from 'grommet';
import { List } from 'immutable';

import { ReceiptId, ReceiptTrackerState, ExpenseData } from '../store/types';

import Expense from './Expense';

interface LinkStateToProps {
    expenses: List<ExpenseData>;
}

interface OwnProps {
    receiptId: ReceiptId;
}

type ExpenseListProps = OwnProps & LinkStateToProps;

const ExpenseList = ({ receiptId, expenses }: ExpenseListProps): JSX.Element => (
    <Box margin="small">
        <Table alignSelf="center">
            <TableBody>
                {expenses.map(
                    (expense): JSX.Element => (
                        <TableRow key={expense.id}>
                            <TableCell>
                                <Expense id={expense.id} receiptId={receiptId} />
                            </TableCell>
                        </TableRow>
                    ),
                )}
            </TableBody>
        </Table>
    </Box>
);

const mapStateToProps = (state: ReceiptTrackerState, ownProps: OwnProps): LinkStateToProps => {
    return {
        expenses: state.receipts
            .get(ownProps.receiptId)
            .expenses.valueSeq()
            .toList(),
    };
};

export default connect(mapStateToProps)(ExpenseList);
