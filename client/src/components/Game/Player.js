import React from 'react';
import Planet from './Planet';

class Player extends React.Component {
    render() {
        return (
            <div className='player'>
                <div className='player-name'>
                    {this.props.player.name}
                </div>

                <div className='player-planets'>
                    {this.props.player.planets}
                </div>
            </div>
        );
    }
}

export default Player;