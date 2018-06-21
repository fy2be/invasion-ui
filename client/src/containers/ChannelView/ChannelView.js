import React from 'react';

class ChannelView extends React.Component {
    handleLeave = () => {
        console.log('handleLeave');
        this.props.actions.ioLeaveChannel();
    }

    render() {
        console.log('ChannelView');
        console.log(this.props);
        return (
            <div>
                <h3>Channel details:</h3>
                <div onClick={this.handleLeave}>--- Click here to leave ---</div>
                Users: {this.props.game.players.length}
                <ul>
                    {this.props.game.players.map(player =>
                        <div key={player}>{player}</div>
                    )}
                </ul>
            </div>
        );
    }
}

export default ChannelView;