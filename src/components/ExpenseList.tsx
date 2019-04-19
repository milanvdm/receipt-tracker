import React from 'react';
import { Box , Table, TableBody, TableRow, TableCell } from 'grommet';
import { observer } from 'mobx-react'
import { List } from 'immutable';

import Expense from './Expense';
import { ReceiptId, ExpenseId, ExpenseData } from '../store/Store'

interface ExpenseListProps {
    receiptId: ReceiptId;
    expenses: List<ExpenseData>;
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: string) => void;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: number) => void;
}

const ExpenseList = ({ receiptId, expenses, updateNote, updatePrice }: ExpenseListProps): JSX.Element =>
    <Box margin='small' >
        <Table alignSelf='center'>
            <TableBody>
                {expenses.map((expense): JSX.Element =>
                    <TableRow key={expense.id}>
                        <TableCell>
                            <Expense 
                                id={expense.id} 
                                receiptId={receiptId}
                                note={expense.note} 
                                price={expense.price}
                                updateNote={updateNote}
                                updatePrice={updatePrice}
                            />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Box>

export default observer(ExpenseList)
