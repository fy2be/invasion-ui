import React from 'react';
import Player from './Player';

class Game extends React.Component {
    render() {
        const players = [];
        this.props.players.forEach((player, id) => {
            players.push(<Player key={id} name={player} />);
        });

        return (
            <div>
                <h3>Game.Component</h3>

                <div className="players-box">
                    {players}
                </div>

                <div className='mid'>
                    <div className='left'>
                        xxx
                    </div>

                    <div className='right'>
                        yyy
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;