import React from 'react';
import Player from '../../components/Game/Player';
import CreateDivision from '../../components/Game/CreateDivision';

class GameView extends React.Component {
    render() {
        return (
            <div>
                <h3>Game.Component</h3>

                <div className="players-box">
                    {this.props.game.players
                        .filter(player => player === this.props.login)
                        .map(player => <Player key={player} name={player} {...this.props} />)}

                    {this.props.game.players
                        .filter(player => player !== this.props.login)
                        .map(player =>
                            <Player key={player} name={player} {...this.props} />
                        )}
                </div>

                <div className='mid'>
                    <div className='left'>
                        {this.props.game.planets
                            .filter(planet => planet.props.details.owner === '-')}
                    </div>

                    <div className='right'>
                        <CreateDivision {...this.props} />
                        {this.props.game.divisions}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameView;