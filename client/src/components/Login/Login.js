import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleLogin} >
                <input type="text" name="login" ref={this.props.loginRef} placeholder="Login" />
                <button type="submit">Login</button>
            </form>
        );
    };
}

export default Login;