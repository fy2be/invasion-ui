import React from 'react';
import Game from './Game/Game';
import { distanceMatrix, planets, divisions } from './mock/test_value';
import { splitPlanets, distance, splitDivisions } from '../helpers';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.players = [
            { name: 'test', planets: [] },
            { name: 'fsfas', planets: [] }
        ];
        this.planets = splitPlanets(planets);
        this.divisions = splitDivisions(divisions);
    }

    render() {
        return (
            <div>
                <Game
                    players={this.players}
                    planets={this.planets}
                    divisions={this.divisions}
                />
            </div>
        );
    }
}

export default App;
