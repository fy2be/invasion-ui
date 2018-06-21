import React from 'react';

const Login = props => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const { login } = e.target;
        props.actions.ioLogin(login.value);
        e.target.reset();
    };

    return (
        <div>
            <div>Server: <span>{props.status.server ? 'Connected' : 'Disconnected'}</span></div>
            <form onSubmit={handleSubmit}>
                <input name='login' type='text' defaultValue='www' />
                <button>Login to the server</button>
            </form>
        </div>
    );
};

export default Login;