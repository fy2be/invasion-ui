import React from 'react';
import io from 'socket.io-client';
import Login from './Login/Login';
import ChannelsList from './Channel/ChannelsList';
import OnChannel from './Channel/OnChannel';
import Game from './Game/Game';
import { splitPlanets, splitDivisions } from '../helpers';

class App extends React.Component {
  loginRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      // status
      // connected -> logged -> onChannel
      update: {
        players: false,
        planets: false,
        divisions: false
      },

      selected: {
        from: null,
        to: null,
        ships: 0,
      },

      distanceMatrix: ''
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
    this.socket.on('DISTANCE_MATRIX', this.handleDistanceMatrix);
    this.socket.on('PLANETS', this.handlePlanets);
    this.socket.on('DIVISIONS', this.handleDivisions);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate() {
  }

  shouldComponentUpdate(props, state) {
    // console.log('App.js shouldComponentUpdate');
    // console.log('nextProps: ');
    // console.log(props);
    // console.log('prevState: ');
    // console.log(state);
    // console.log('state: ');
    // console.log(this.state);
    // if (state.status === 'connected')
    //   return false;

    return true;
  }

  componentWillUnmount() {
    const timers = { ...this.state.timers };
    timers.forEach(timer => {
      clearInterval(timer);
    });
  }

  handleConnect = () => {
    this.setState({ status: 'connected' });
  }

  handleLoginOk = () => {
    this.setState({ status: 'logged' });
    this.socket.emit('list_channels');

    this.timers.listChannels = setInterval(() => {
      if (this.state.status === 'logged') {
        this.socket.emit('list_channels');
      }
    }, 3000);
  }

  handleListChannelsOk = data => {
    const channels = data.split(' ').splice(1);
    this.setState({ channels });
  }

  handleJoinChannelOk = data => {
    const players = data.split(' ').splice(1);
    this.setState({
      status: 'onChannel',
      players: players.map(player => ({ name: player, planets: [] }))
    });
    clearInterval(this.timers.listChannels);
  }

  handleLeaveChannelOk = () => {
    this.setState({
      status: 'logged',
      players: []
    });

    this.timers.listChannels = setInterval(() => {
      if (this.state.status === 'logged') {
        this.socket.emit('list_channels');
      }
    }, 3000);
  }

  handleGameMode = () => {
    this.setState({ status: 'game' });
  }

  handlePlanets = data => {
    this.setState({
      planets: splitPlanets(data),
      update: {
        planets: true,
        players: true
      }
    });
  };

  handleDivisions = data => {
    const update = { ...this.state.update };
    update.divisions = true;

    this.setState({
      divisions: splitDivisions(data),
      update
    });
  };

  handleLogin = e => {
    e.preventDefault();
    this.socket.emit('login', this.loginRef.current.value);
    this.setState({ login: this.loginRef.current.value });
  }

  handleJoin = channel => {
    this.socket.emit('join_channel', channel);
  }

  handleLeaveChannel = () => {
    this.socket.emit('leave_channel');
  }

  checkAsUpdated = what => {
    const update = Object.assign({}, this.state.update);
    update[what] = false;

    this.setState({ update });
  }

  updatePlayers = (players, callback) => {
    this.setState({ players }, callback);
  }

  handleChangeProduction = (planetName, production) => {
    this.socket.emit('change_production', `${planetName} ${production}`);
  };

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.setState({
        selected: {
          from: null,
          to: null,
          ships: 0,
        }
      });
    }
    else if (e.key === 'Shift') {
      if (this.state.selected && this.state.selected.from !== null && this.state.selected.to !== null && this.state.selected.ships > 0) {
        const { from, to, ships } = { ...this.state.selected };
        this.socket.emit('send_division', `${from.name} ${to.name} ${ships}`);

        const update = { ...this.state.update };
        update.divisions = true;
        this.setState({ update });
      }
    }

  }

  handlePickPlanet = planet => {
    console.log(`Picked: ${planet.name}`);

    const selected = Object.assign({}, this.state.selected);

    if (planet.owner === this.state.login) {
      if (!selected.from) {
        selected.from = planet;
      } else {
        selected.to = planet;
      }
    } else {
      selected.to = planet;
    }

    this.setState({ selected });

  }

  handleDistanceMatrix = distanceMatrix => {
    const update = { ...this.state.update };
    update.planets = true;

    this.setState({
      distanceMatrix,
      update
    });
  }

  setShips = ships => {
    const selected = { ...this.state.selected };
    selected.ships = ships;
    this.setState({
      selected
    });
  }

  render() {
    return (
      <div>
        {this.state.status === 'connected' ? <Login handleLogin={this.handleLogin} loginRef={this.loginRef} /> : null}
        {this.state.status === 'logged' ? <ChannelsList channels={this.state.channels} handleJoin={this.handleJoin} /> : null}
        {this.state.status === 'onChannel' ||
          this.state.status === 'game' ? <OnChannel users={this.state.usersOnChannel} handleLeaveChannel={this.handleLeaveChannel} /> : null}
        {this.state.status === 'game' ?
          <Game
            login={this.state.login}
            update={this.state.update}
            checkAsUpdated={this.checkAsUpdated}
            updatePlayers={this.updatePlayers}
            handleChangeProduction={this.handleChangeProduction}
            handlePickPlanet={this.handlePickPlanet}
            players={this.state.players}
            planets={this.state.planets}
            divisions={this.state.divisions}
            selected={this.state.selected}
            setShips={this.setShips}
            distanceMatrix={this.state.distanceMatrix}
          /> : null}
      </div>
    );
  }
}

export default App;
