export const SET_STATUS_SERVER = 'STATUS_SERVER';
export const SET_STATUS_SOCKETIO = 'STATUS_SOCKETIO';

const setStatusServer = isConnected => ({
    type: SET_STATUS_SERVER,
    isConnected
});

const setStatusSocketIO = isConnected => ({
    type: SET_STATUS_SOCKETIO,
    isConnected
});

export { setStatusServer, setStatusSocketIO };