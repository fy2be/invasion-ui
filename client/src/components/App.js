import React from 'react';
import io from 'socket.io-client';
import Login from './Login/Login';
import ChannelsList from './Channel/ChannelsList';
import OnChannel from './Channel/OnChannel';
import Game from './Game/Game';

class App extends React.Component {
  loginRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      // status
      // connected -> logged -> onChannel
    };

    this.timers = {
    };

    this.socket = io('http://localhost:3333');

    this.socket.on('connect', this.handleConnect);
    this.socket.on('LOGIN_OK', this.handleLoginOk);
    this.socket.on('LIST_CHANNELS_OK', this.handleListChannelsOk);
    this.socket.on('JOIN_CHANNEL_OK', this.handleJoinChannelOk);
    this.socket.on('LEAVE_CHANNEL_OK', this.handleLeaveChannelOk);
    this.socket.on('GAME_MODE', this.handleGameMode);
    // this.socket.on('DISTANCE_MATRIX', this.handleDistanceMatrix);
    this.socket.on('PLANETS')
  }

  handleConnect = () => {
    this.setState({ status: 'connected' });
    console.log('connected');
  }

  handleLoginOk = () => {
    this.setState({ status: 'logged' });
    console.log('logged');
    this.socket.emit('list_channels');

    this.timers.listChannels = setInterval(() => {
      if (this.state.status === 'logged') {
        this.socket.emit('list_channels');
      }
    }, 3000);
  }

  handleListChannelsOk = data => {
    console.log('Channels list: ' + data);
    const channels = data.split(' ').splice(1);
    this.setState({ channels });
  }

  handleJoinChannelOk = data => {
    console.log('Joined to channel with: ' + data);
    const usersOnChannel = data.split(' ').splice(1);
    this.setState({ status: 'onChannel', usersOnChannel });
    clearInterval(this.timers.listChannels);
  }

  handleLeaveChannelOk = () => {
    console.log('Leaved channel.');
    this.setState({ status: 'logged' });
  }

  handleGameMode = () => {
    console.log('Game mode!');
    this.setState({ status: 'game' });
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

  handleLeaveChannel = () => {
    this.socket.emit('leave_channel');
  }

  render() {
    return (
      <div>
        {this.state.status === 'connected' ? <Login handleLogin={this.handleLogin} loginRef={this.loginRef} /> : null}
        {this.state.status === 'logged' ? <ChannelsList channels={this.state.channels} handleJoin={this.handleJoin} /> : null}
        {this.state.status === 'onChannel' ? <OnChannel users={this.state.usersOnChannel} handleLeaveChannel={this.handleLeaveChannel} /> : null}
        {this.state.status === 'game' ? <Game /> : null}
      </div>
    );
  }
}

export default App;
