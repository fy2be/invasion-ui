import { SET_STATUS_SERVER, SET_STATUS_SOCKETIO } from '../actions/status';

const status = (state = {}, action) => {
    switch (action.type) {
        case SET_STATUS_SERVER:
            return {
                ...state,
                server: action.isConnected ? true : false
            };

        case SET_STATUS_SOCKETIO:
            return {
                ...state,
                socketio: action.isConnected ? true : false
            };

        default:
            return state;
    };
};

export default status;