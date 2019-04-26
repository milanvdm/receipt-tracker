import React from 'react';
import { createStore } from 'redux';
import { cleanup, fireEvent } from 'react-testing-library';
import { Map, List } from 'immutable';
import { renderWithRedux } from '../utils/helpers';

import { ReceiptData, ReceiptTrackerState, ExpenseData } from '../../app/store/types';
import rootReducer from '../../app/store/reducers';

import Expense from '../../app/components/Expense';

afterEach(cleanup);

test('Expense correctly follows the store state', (): void => {
    const receiptId = '1';
    const expenseId = '1';
    const expense: ExpenseData = { id: expenseId, note: 'test', price: 123 };
    const receipt: ReceiptData = { id: receiptId, category: 'food', expenses: Map({ [expenseId]: expense }) };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [receiptId]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByValue } = renderWithRedux(store, <Expense receiptId={receiptId} id={expenseId} />);

    const note = getByValue('test');
    const price = getByValue('123');

    expect(note).toBeDefined();
    expect(price).toBeDefined();
});

test('Expense correctly fills in the form fields', (): void => {
    const receiptId = '1';
    const expenseId = '1';
    const expense: ExpenseData = { id: expenseId };
    const receipt: ReceiptData = { id: receiptId, category: 'food', expenses: Map({ [expenseId]: expense }) };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [receiptId]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByPlaceholderText } = renderWithRedux(store, <Expense receiptId={receiptId} id={expenseId} />);

    fireEvent.change(getByPlaceholderText('Add a note'), { target: { value: 'updated' } });
    fireEvent.change(getByPlaceholderText('Add a price'), { target: { value: '321' } });

    const storedExpense: ExpenseData = store
        .getState()
        .receipts.valueSeq()
        .filter((receipt): boolean => receipt.id == receiptId)
        .flatMap((receipt): List<ExpenseData> => receipt.expenses.valueSeq().toList())
        .filter((expense): boolean => expense.id == expenseId)
        .toList()
        .first();

    expect(storedExpense).toBeDefined();
    expect(storedExpense.note).toBe('updated');
    expect(storedExpense.price).toBe(321);
});

test('Expense correctly handles price with `,` as delimiter', (): void => {
    const receiptId = '1';
    const expenseId = '1';
    const expense: ExpenseData = { id: expenseId, price: 123 };
    const receipt: ReceiptData = { id: receiptId, category: 'food', expenses: Map({ [expenseId]: expense }) };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [receiptId]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByPlaceholderText } = renderWithRedux(store, <Expense receiptId={receiptId} id={expenseId} />);

    fireEvent.change(getByPlaceholderText('Add a price'), { target: { value: '123,5' } });

    const storedExpense: ExpenseData = store
        .getState()
        .receipts.valueSeq()
        .filter((receipt): boolean => receipt.id == receiptId)
        .flatMap((receipt): List<ExpenseData> => receipt.expenses.valueSeq().toList())
        .filter((expense): boolean => expense.id == expenseId)
        .toList()
        .first();

    expect(storedExpense).toBeDefined();
    expect(storedExpense.price).toBe(123.5);
});

test('Expense correctly shows an error on a non-number price', (): void => {
    const receiptId = '1';
    const expenseId = '1';
    const expense: ExpenseData = { id: expenseId };
    const receipt: ReceiptData = { id: receiptId, category: 'food', expenses: Map({ [expenseId]: expense }) };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [receiptId]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByText, getByPlaceholderText } = renderWithRedux(
        store,
        <Expense receiptId={receiptId} id={expenseId} />,
    );

    fireEvent.change(getByPlaceholderText('Add a price'), { target: { value: '123b' } });

    const errorMessage = getByText('Provide a number :)');

    expect(errorMessage).toBeDefined();
});
