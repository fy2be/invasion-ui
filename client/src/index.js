import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import './css/style.css';

import Login from './screens/Login/login'

import { Provider } from 'react-redux';
import store from './store';

const Rc = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Rc />, document.getElementById('app'));
