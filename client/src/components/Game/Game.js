import React from 'react';
import io from 'socket.io-client';

import Login from '../../screens/Login/Login';
import Chanlist from '../../screens/Chanlist/Chanlist';

class Game extends React.Component {
    componentDidMount() {
        this.socket = io('http://localhost:3333');

        this.socket.on('connect', () => {
            console.log(this.props);
            this.props.actions.setStatusServer(true);
            this.props.actions.setStatusSocketIO(true);
        });
    }

    render() {
        switch (this.props.screen) {
            case 'login':
                return <Login {...this.props} />

            case 'chanlist':
                return <Chanlist {...this.props} />

            default:
                return <Login {...this.props} />
        };
    }
}

export default Game;