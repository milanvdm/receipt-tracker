import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function renderApp(): void {
    const root = document.getElementById('root');
    ReactDOM.render(<App />, root);
}

renderApp();

module.hot.accept(renderApp);
