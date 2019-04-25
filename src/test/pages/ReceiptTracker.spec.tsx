import React from 'react';
import { createStore } from 'redux';
import { cleanup, fireEvent } from 'react-testing-library';
import { Map, List } from 'immutable';
import { renderWithRedux } from '../utils/helpers';

import { ReceiptData, ReceiptTrackerState, ExpenseData } from '../../app/store/types';
import rootReducer from '../../app/store/reducers';

import ReceiptTracker from '../../app/pages/ReceiptTracker';

afterEach(cleanup);

test('ReceiptTracker correctly follows the store state', () => {
    const id = '1';
    const receipt: ReceiptData = { id: id, category: 'food', expenses: Map() };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [id]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByText } = renderWithRedux(store, <ReceiptTracker />);

    fireEvent.click(getByText('Add Receipt'));

    expect(store.getState().receipts.size).toBe(2);
});

test('ReceiptTracker correctly shows the sum of all expenses', () => {
    const expenses: Map<string, ExpenseData> = List([...Array(5)].keys())
        .map((id: number): ExpenseData => ({ id: id.toString(), price: 5 }))
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

    const { getByText } = renderWithRedux(store, <ReceiptTracker />);

    const total = getByText((5 * 5 * 2).toString());

    expect(total).toBeDefined();
});
