import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import rootReducer from './reducers/root';

const defaultState = {
    login: null,
    status: {
        server: false,
    },
    channels: [],
    game: {
        players: [],
        operator: '',
        planets: [],
        divisions: [],
        send: {
            from: null,
            to: null,
            ships: 0,
            distance: 0,
        },
    }
};


const socketio = io('http://localhost:3333');
const socketioMiddleware = createSocketIoMiddleware(socketio, "IO_");

const store = applyMiddleware(socketioMiddleware)(createStore)(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;