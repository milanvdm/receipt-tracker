import React from 'react';
import { createStore } from 'redux';
import { cleanup } from 'react-testing-library';
import { Map, List } from 'immutable';
import { renderWithRedux } from '../utils/helpers';

import { ReceiptData, ReceiptTrackerState, ExpenseData } from '../../app/store/types';
import { addExpense } from '../../app/store/actions';
import rootReducer from '../../app/store/reducers';

import ExpenseList from '../../app/components/ExpenseList';

afterEach(cleanup);

test('ExpenseList correctly follows the store state', (): void => {
    const expenses: Map<string, ExpenseData> = List([...Array(5)].keys())
        .map((id: number): ExpenseData => ({ id: id.toString() }))
        .toMap()
        .mapKeys((id: number): string => id.toString());

    const receipts: Map<string, ReceiptData> = List([...Array(2)].keys())
        .map((id: number): ReceiptData => ({ id: id.toString(), category: 'food', expenses: expenses }))
        .toMap()
        .mapKeys((id: number): string => id.toString());

    const initialState: ReceiptTrackerState = {
        receipts: receipts,
    };

    const store = createStore(rootReducer, initialState);

    const { getAllByPlaceholderText } = renderWithRedux(store, <ExpenseList receiptId={'0'} />);
    const initialExpenses = getAllByPlaceholderText('Add a note');

    store.dispatch(addExpense('0'));

    const newExpenses = getAllByPlaceholderText('Add a note');

    expect(initialExpenses.length).toBe(5);
    expect(newExpenses.length).toBe(6);
});
