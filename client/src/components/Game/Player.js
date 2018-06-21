import React from 'react';

class Player extends React.Component {
    render() {
        return (
            <div className='player'>
                <div className='player-name'>
                    {this.props.name}
                </div>

                <div className='player-planets'>
                    {this.props.game.planets
                        .filter(planet => planet.props.details.owner === this.props.name)}
                </div>
            </div>
        );
    }
}

export default Player;