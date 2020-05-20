import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import 'rsuite/dist/styles/rsuite-default.css';
import {createStore} from 'redux';
import allReducers from './components/reducers/Reducers';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<App />, document.getElementById('root'));

