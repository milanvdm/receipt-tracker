import React, { Component } from 'react';
import { Grommet, grommet } from 'grommet';
import { hot } from 'react-hot-loader';
import { decorate, observable, action } from 'mobx';

import Home from './pages/Home';
import { Store } from './store/Store';

decorate(Store, {
    receiptList: observable,
    addReview: action
});

const store = new Store();

class App extends Component {
    public render(): JSX.Element {
        return (
            <Grommet full theme={grommet}>
                <Home store={store} />
            </Grommet>
        );
    }
}

export default hot(module)(App)
