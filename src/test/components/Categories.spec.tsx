import React from 'react';
import { createStore } from 'redux';
import { cleanup } from 'react-testing-library';
import { Map } from 'immutable';
import { renderWithRedux } from '../utils/helpers';

import { ReceiptData, ReceiptTrackerState } from '../../app/store/types';
import { updateCategory } from '../../app/store/actions';
import rootReducer from '../../app/store/reducers';

import Categories from '../../app/components/Categories';

afterEach(cleanup);

test('can render a category selector', () => {
    const id = '1';
    const receipt: ReceiptData = { id: id, category: 'food', expenses: Map() };
    const initialState: ReceiptTrackerState = {
        receipts: Map({ [id]: receipt }),
    };

    const store = createStore(rootReducer, initialState);

    const { getByPlaceholderText } = renderWithRedux(store, <Categories receiptId={id} />);
    const categoryElement = getByPlaceholderText('Select a Category') as HTMLInputElement;

    const initialCategory = categoryElement.value;

    store.dispatch(updateCategory(id, 'house'));

    const newCategory = categoryElement.value;

    expect(initialCategory).toBe('food');
    expect(newCategory).toBe('house');
});
