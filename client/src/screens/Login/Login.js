import React from 'react';
import PropTypes from 'prop-types';

const Login = props => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const { login } = e.target;
        console.log(login.value);
        props.actions.ioLogin(login.value);
        e.target.reset();
    };

    return (
        <div>
            <div>Server: <span>{props.status.server ? 'Connected' : 'Disconnected'}</span></div>
            <div>SocketIO: <span>{props.status.socketio ? 'Connected' : 'Disconnected'}</span></div>
            <form onSubmit={handleSubmit}>
                <input name='login' type='text' defaultValue='www' />
                <button>Login to the server</button>
            </form>
        </div>
    );
};

// Login.propTypes = {
//     actions: PropTypes.shape({
//         ioLogin: PropTypes.func,
//     }).isRequired,

//     status: PropTypes.shape({
//         server: PropTypes.bool.isRequired,
//         socketio: PropTypes.bool.isRequired
//     })
// };



export default Login;