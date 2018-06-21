import { IO_SERVER_STATUS } from '../actions/io';

const status = (state = {}, action) => {
    if (action.type === IO_SERVER_STATUS) {
        return {
            ...state.status,
            server: action.status === 'connected'
        }
    }
    return state;
}

export { status };