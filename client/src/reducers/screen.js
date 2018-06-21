export const IO_GAME_LOGIN_OK = 'IO_GAME_LOGIN_OK';
export const IO_GAME_JOIN_CHANNEL_OK = 'IO_GAME_JOIN_CHANNEL_OK';
export const IO_GAME_GAME_MODE = 'IO_GAME_GAME_MODE';
export const IO_GAME_LEAVE_CHANNEL_OK = 'IO_GAME_LEAVE_CHANNEL_OK';

const screen = (state = 'login', action) => {
    switch (action.type) {
        case IO_GAME_LOGIN_OK:
        case IO_GAME_LEAVE_CHANNEL_OK:
            return 'chanlist';

        case IO_GAME_JOIN_CHANNEL_OK:
            return 'channel';

        case IO_GAME_GAME_MODE:
            return 'game';

        default:
            return state;
    }
};

export default screen;