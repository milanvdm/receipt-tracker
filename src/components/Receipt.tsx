import React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react'
import { List } from 'immutable';

import Total from './Total';
import Categories from './Categories';
import AddButton from './AddButton';
import { ReceiptId, ExpenseId, ExpenseData } from '../store/Store'
import ExpenseList from './ExpenseList';

interface ReceiptProps { 
    id: ReceiptId;
    category?: string;
    expenses: List<ExpenseData>;
    addExpense: (receiptId: ReceiptId) => void;
    updateCategory: (receiptId: ReceiptId, category: string) => void;
    updateNote: (receiptId: ReceiptId, expenseId: ExpenseId, note: string) => void;
    updatePrice: (receiptId: ReceiptId, expenseId: ExpenseId, price: number) => void;
}

const Receipt = ({ id, category, expenses, addExpense, updateCategory, updateNote, updatePrice }: ReceiptProps): JSX.Element => 
    <Box border margin='small' pad='small'>
        <Box direction='row' gap='small'>
            <Categories receiptId={id} category={category} updateCategory={updateCategory} />
            <AddButton label='Add Expense' onClick={(): void => addExpense(id)} />
        </Box>
        <ExpenseList
            receiptId={id}
            expenses={expenses}
            updateNote={updateNote}
            updatePrice={updatePrice}
        />
        <Box align='end'>
            <Total value={123} />
        </Box>
    </Box>

export default observer(Receipt)
