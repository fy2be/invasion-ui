import React from 'react';
import Player from './Player';
import PlanetThumb from './PlanetThumb';
import Division from './Division';
import SendDivision from './SendDivision';

class Game extends React.Component {
    planetsToRender = [];
    playersToRender = [];
    divisionsToRender = [];

    planets = [];
    players = [];
    divisions = [];

    componentDidUpdate() {
        if (!this.props.players || !this.props.divisions || !this.props.planets)
            return;

        this.planets = [...this.props.planets];
        this.players = [...this.props.players];
        this.divisions = [...this.props.divisions];

        if (this.props.update.planets)
            this.updatePlanets();

        if (this.props.update.players)
            this.updatePlayers();

        if (this.props.update.divisions)
            this.updateDivisions();

    }

    updatePlanets() {
        this.planetsToRender = [];
        this.planets.forEach((planet, id) => {
            if (planet.owner === '-') {
                this.planetsToRender.push(
                    <PlanetThumb
                        key={id}
                        planet={planet}
                        login={this.props.login}
                        handlePickPlanet={this.props.handlePickPlanet}
                        enablePick
                        selected={this.props.selected}
                        distanceMatrix={this.props.distanceMatrix}
                        showDistance
                    />
                );
            }
        });

        this.props.checkAsUpdated('planets');
    }

    updatePlayers() {
        this.players.forEach(player => {
            player.planets = [];
        });

        this.planets
            .filter(planet => planet.owner !== '-')
            .forEach((planet, id) => {
                const owner = this.players.find(player => player.name === planet.owner);
                owner.planets.push(
                <PlanetThumb
                    key={id}
                    planet={planet}
                    handleChangeProduction={this.props.handleChangeProduction}
                    handlePickPlanet={this.props.handlePickPlanet}
                    enablePick
                    login={this.props.login}
                />
                );
            });

        this.props.updatePlayers(this.players, () => {
            this.playersToRender = [];
            const me = this.players.find(player => player.name === this.props.login);
            this.playersToRender.push(<Player key="me" player={me} />);

            this.players
                .filter(player => player !== me)
                .forEach((player, id) => {
                    this.playersToRender.push(<Player key={id} player={player} />);
                });
        })

        this.props.checkAsUpdated('players');
    }

    updateDivisions() {
        this.divisionsToRender = this.divisions.map((division, id) => {
            const div = {
                name: division.name,
                from: this.planets.find(planet => planet.name === division.from),
                to: this.planets.find(planet => planet.name === division.to),
                ships: division.ships,
                timeleft: division.timeleft
            };

            return <Division key={id} division={div} />
        });

        this.props.checkAsUpdated('divisions');
    }

    render() {
        return (
            <div>
                <h3>Game.Component</h3>

                <div className="players-box">
                    {this.playersToRender}
                </div>

                <div className='mid'>
                    <div className='left'>
                        {this.planetsToRender}
                    </div>

                    <div className='right'>
                        <SendDivision
                            selected={this.props.selected}
                            setShips={this.props.setShips}
                            distanceMatrix={this.props.distanceMatrix}
                        />
                        {this.divisionsToRender}
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;