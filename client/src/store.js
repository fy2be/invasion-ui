import { createStore } from 'redux';

import rootReducer from './reducers/root';

const defaultState = {
    login: null,

    status: {
        server: false,
        socketio: false
    }
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;