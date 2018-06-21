import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actionCreators from '../actions'
import { ioLogin, ioListChannels, ioJoinChannel, ioLeaveChannel } from '../actions/io';
import { pickPlanet } from '../actions/game';

import SwitchScreen from '../components/SwitchScreen/SwitchScreen';

const mapStateToProps = state => {
    return ({
        login: state.login,
        status: state.status,
        screen: state.screen,
        channels: state.channels,
        game: state.game,
    })
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ioLogin, ioListChannels, ioJoinChannel, ioLeaveChannel
        }, dispatch),
        game: {
            actions: bindActionCreators({ pickPlanet }, dispatch)
        }
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(SwitchScreen);

export default App;