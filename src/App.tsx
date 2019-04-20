import React, { Component } from 'react';
import { Grommet, grommet } from 'grommet';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import ReceiptTracker from './pages/ReceiptTracker';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {
    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <Grommet full theme={grommet}>
                    <ReceiptTracker />
                </Grommet>
            </Provider>
        );
    }
}

export default hot(module)(App);
