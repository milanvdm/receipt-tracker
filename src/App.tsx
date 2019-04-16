import React, { Component } from 'react';
import { Grommet, grommet } from 'grommet';
import { hot } from 'react-hot-loader';

import Home from './pages/Home';
import { Store } from './store/Store';

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
