import React from 'react';
import { createStore } from 'redux';
import { cleanup } from 'react-testing-library';
import { Map, List } from 'immutable';
import { renderWithRedux } from '../utils/helpers';

import { ReceiptData, ReceiptTrackerState } from '../../app/store/types';
import { addReceipt } from '../../app/store/actions';
import rootReducer from '../../app/store/reducers';

import ReceiptList from '../../app/components/ReceiptList';

afterEach(cleanup);

test('can render a list of receipts', () => {
    const receipts: Map<string, ReceiptData> = List([...Array(5)].keys())
        .map((id: number): ReceiptData => ({ id: id.toString(), category: 'food', expenses: Map() }))
        .toMap()
        .mapKeys((id: number): string => id.toString())

    const initialState: ReceiptTrackerState = {
        receipts: receipts,
    };

    const store = createStore(rootReducer, initialState);

    const { getAllByPlaceholderText } = renderWithRedux(store, <ReceiptList />);
    const initialReceipts = getAllByPlaceholderText('Select a Category');

    store.dispatch(addReceipt());

    const newReceipts = getAllByPlaceholderText('Select a Category');

    expect(initialReceipts.length).toBe(5);
    expect(newReceipts.length).toBe(6);
});
