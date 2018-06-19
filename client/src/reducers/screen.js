import {
    SET_SCREEN_TO_LOGIN, SET_SCREEN_TO_CHANLIST, SET_SCREEN_TO_CHANNEL, SET_SCREEN_TO_GAME
} from '../actions/screen';

const screen = (state = 'login', action) => {
    switch (action.type) {
        case SET_SCREEN_TO_LOGIN:
            return {
                ...state,
                screen: 'login'
            };

        case SET_SCREEN_TO_CHANLIST:
            return {
                ...state,
                screen: 'chanlist'
            };

        case SET_SCREEN_TO_CHANNEL:
            return {
                ...state,
                screen: 'channel'
            };

        case SET_SCREEN_TO_GAME:
            return {
                ...state,
                screen: 'game'
            };

        default:
            return state;
    }
};

export default screen;