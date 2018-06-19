import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as actionCreators from '../actions'
import { ioLogin } from '../actions/io';
import { setStatusServer, setStatusSocketIO } from '../actions/status';

import Game from '../components/Game/Game';

const mapStateToProps = state => {
    console.log('--- mapStateToProps');
    console.log(state);
    console.log('--- end');
    return ({
        login: state.login,
        status: state.status,
        screen: state.screen
    })
};

const mapDispatchToProps = dispatch => {
    console.log('--- mapDispatchToProps');
    console.log(dispatch);
    console.log('--- end');
    return {
        actions: bindActionCreators({
            ioLogin, setStatusServer, setStatusSocketIO
        }, dispatch)
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(Game);

export default App;