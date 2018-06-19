export const SET_SCREEN_TO_LOGIN = 'SET_SCREEN_TO_LOGIN';
export const SET_SCREEN_TO_CHANLIST = 'SET_SCREEN_TO_CHANLIST';
export const SET_SCREEN_TO_CHANNEL = 'SET_SCREEN_TO_CHANNEL';
export const SET_SCREEN_TO_GAME = 'SET_SCREEN_TO_GAME';

const setScreenToLogin = () => ({ type: SET_SCREEN_TO_LOGIN });
const setScreenToChanlist = () => ({ type: SET_SCREEN_TO_CHANLIST });
const setScreenToChannel = () => ({ type: SET_SCREEN_TO_CHANNEL });
const setScreenToGame = () => ({ type: SET_SCREEN_TO_GAME });

export {
    setScreenToLogin,
    setScreenToChanlist,
    setScreenToChannel,
    setScreenToGame
};
