const login = (state = {}, action) => {
    if (action.type === 'IO_LOGIN') {
        console.log('Wpadlo IO_LOGIN');
        return {
            ...state,
            login: action.login
        };
    }

    return state;
};

export default login;