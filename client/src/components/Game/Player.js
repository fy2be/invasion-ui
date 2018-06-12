import React from 'react';
import Planet from './Planet';

class Player extends React.Component {
    render() {
        const planet1 = {
            name: 'M0RF7',
            efficiency: 1,
            owner: 'm0rfik',
            ships: 10,
            tanks: 10,
            production: 1,
            turn: 0
        };

        const planet2 = {
            name: 'M0RF8',
            efficiency: 1,
            owner: 'm0rfik',
            ships: 10,
            tanks: 10,
            production: 0,
            turn: 0
        };

        return (
            <div className='player'>
                <div className='player-name'>
                    {this.props.name}
                </div>

                <div className='player-planets'>
                    <Planet planet={planet1} />
                    <Planet planet={planet2} />
                </div>
            </div>
        );
    }
}

export default Player;