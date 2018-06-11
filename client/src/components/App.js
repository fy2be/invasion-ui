import React from 'react';
import io from 'socket.io-client';
import Login from './Login/Login';
import ChannelsList from './Channel/ChannelsList';

class App extends React.Component {
  loginRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      // status
      // connected -> logged -> onChannel
    };

    this.socket = io('http://localhost:3333');

    this.socket.on('connect', this.handleConnect);
    this.socket.on('LOGIN_OK', this.handleLoginOk);
    this.socket.on('LIST_CHANNELS_OK', this.handleListChannelsOk);
    this.socket.on('JOIN_CHANNEL_OK', this.handleJoinChannelOk);
  }

  handleConnect = () => {
    this.setState({ status: 'connected' });
    console.log('connected');
  }

  handleLoginOk = () => {
    this.setState({ status: 'logged' });
    console.log('logged');
    this.socket.emit('list_channels');
  }

  handleListChannelsOk = data => {
    console.log('Channels list: ' + data);
    const channels = data.split(' ').splice(1);
    this.setState({ channels });
  }

  handleJoinChannelOk = data => {
    console.log('Joined to channel with: ' + data);
    this.setState({ status: 'onChannel' });
  }

  handleLogin = e => {
    e.preventDefault();
    console.log('Log as: ' + this.loginRef.current.value);
    this.socket.emit('login', this.loginRef.current.value);
  }

  handleJoin = channel => {
    console.log('Join to: ' + channel);
    this.socket.emit('join_channel', channel);
  }

  render() {
    return (
      <div>
        {this.state.status === 'connected' ? <Login handleLogin={this.handleLogin} loginRef={this.loginRef} /> : null}
        {this.state.status === 'logged' ? <ChannelsList channels={this.state.channels} handleJoin={this.handleJoin} /> : null}

      </div>
    );
  }
}

export default App;
