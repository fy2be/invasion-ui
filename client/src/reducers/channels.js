const IO_GAME_LIST_CHANNELS_OK = 'IO_GAME_LIST_CHANNELS_OK';

const channels = (state = [], action) => {
    switch (action.type) {
        case IO_GAME_LIST_CHANNELS_OK:
            return action.data.split(' ').slice(1);

        default:
            return state;
    }
}

export default channels;