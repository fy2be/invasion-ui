import React from 'react';

import Login from '../../containers/Login/Login';
import ChanList from '../../containers/ChanList/ChanList';
import ChannelView from '../../containers/ChannelView/ChannelView';
import GameView from '../../containers/Game/View';

const SwitchScreen = props => {
    switch (props.screen) {
        case 'login':
            return <Login {...props} />

        case 'chanlist':
            return <ChanList {...props} />

        case 'channel':
            return <ChannelView {...props} />

        case 'game':
            return <GameView {...props} />

        default:
            return <Login {...props} />
    }
};

export default SwitchScreen;