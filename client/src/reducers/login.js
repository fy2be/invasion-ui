const login = (state = {}, action) => {
    if (action.type === 'IO_LOGIN') {
        return action.login;
    }

    return state;
};

export default login;