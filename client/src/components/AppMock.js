import React from 'react';
import Game from './Game/Game';
import { distanceMatrix, planets, divisions } from './mock/test_value';
import { splitPlanets, distance } from '../helpers';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.players = ['test1', 'test2'];
        this.planets = splitPlanets(planets);
        this.divisions = divisions;
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
