import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, RenderResult } from 'react-testing-library';

export const renderWithRedux = (store: Store, ui: JSX.Element): RenderResult => {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
    };
};
