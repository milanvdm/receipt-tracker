import React from 'react';
import { Box , Table, TableBody, TableRow, TableCell } from 'grommet';
import { observer } from 'mobx-react'
import { List } from 'immutable';

import Receipt from './Receipt';
import { ReceiptId, ReceiptData, ExpenseId } from '../store/Store'

interface ReceiptListProps { 
    receipts: List<ReceiptData>;
    addExpense: (receiptId: ReceiptId) => void;
    updateCategory: (receiptId: ReceiptId, category: string) => void;
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: string) => void;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: number) => void;
}

const ReceiptList = ({ receipts, addExpense, updateCategory, updateNote, updatePrice }: ReceiptListProps): JSX.Element =>
    <Box margin='small' >
        <Table alignSelf='center'>
            <TableBody>
                {receipts.map((receipt): JSX.Element =>
                    <TableRow key={receipt.id}>
                        <TableCell>
                            <Receipt 
                                id={receipt.id} 
                                category={receipt.category}
                                expenses={receipt.expenses.valueSeq().toList()}
                                addExpense={addExpense}
                                updateCategory={updateCategory}
                                updateNote={updateNote}
                                updatePrice={updatePrice}
                            />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </Box>

export default observer(ReceiptList)
