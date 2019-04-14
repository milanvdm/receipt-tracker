import React, { Component } from 'react';
import { Grommet, grommet } from 'grommet';
import { hot } from 'react-hot-loader';

import Home from './pages/home';

class App extends Component {
    public render(): JSX.Element {
        return (
            <Grommet full theme={grommet}>
                <Home />
            </Grommet>
        );
    }
}

export default hot(module)(App)
