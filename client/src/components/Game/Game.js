import React from 'react';
import Player from './Player';
import PlanetThumb from './PlanetThumb';
import Division from './Division';

class Game extends React.Component {
    render() {

        const players = this.props.players;
        const divisions = this.props.divisions;
        const planets = this.props.planets;

        const planetsToRender = [];

        planets.forEach((planet, id) => {
            if (planet.owner === '-') {
                planetsToRender.push(<PlanetThumb key={id} planet={planet} />);
            } else {
                const owner = players.find(player => player.name === planet.owner);
                owner.planets.push(<PlanetThumb key={id} planet={planet} />);
            }
        });

        const playersToRender = [];
        this.props.players.forEach((player, id) => {
            playersToRender.push(<Player key={id} player={player} />);
        });

        const divisionsToRender = divisions.map((division, id) => {
            const div = {
                name: division.name,
                from: planets.find(planet => planet.name === division.from),
                to: planets.find(planet => planet.name === division.to),
                ships: division.ships
            };

            console.log('from: ' + div.from.name);

            return <Division division={div} />
        });

        console.log(divisionsToRender);

        return (
            <div>
                <h3>Game.Component</h3>

                <div className="players-box">
                    {playersToRender}
                </div>

                <div className='mid'>
                    <div className='left'>
                        {planetsToRender}
                    </div>

                    <div className='right'>
                        {divisionsToRender}
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;