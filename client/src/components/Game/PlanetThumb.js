import React from 'react';
import { calcDistance } from '../../helpers';

const PlanetThumb = props => {
    if (!props.planet)
        return null;

    const activeShips = props.planet.production === 1 ? 'active' : '';
    const activeTanks = props.planet.production === 2 ? 'active' : '';

    const shipsProperties = { className: "fas fa-rocket " + activeShips };
    const tanksProperties = { className: "fas fa-suitcase " + activeTanks };

    const planetThumbProperties = {
        className: 'planet-thumb',
    };

    if (props.enablePick) {
        if (props.planet.owner === props.login) {
            shipsProperties.onClick = () => props.handleChangeProduction(props.planet.name, 1);
            tanksProperties.onClick = () => props.handleChangeProduction(props.planet.name, 2);
        }
        planetThumbProperties.onClick = () => props.handlePickPlanet(props.planet);
    }

    let distance = null;
    if (props.showDistance) {
        if (props.selected.from && props.selected.from !== null) {
            distance = calcDistance(props.distanceMatrix, props.selected.from.name, props.planet.name);
        }
    }

    const showDistance = () => {
        if (distance)
            return ` (${distance})`;
    };

    return (
        <div {...planetThumbProperties}>
            <div className='name'>{props.planet.name}{showDistance()}</div>
            <div className='eq'>
                <span className='turn'>{props.planet.turn}</span>
                <span className='between'>/</span>
                <span className='efficiency'>{props.planet.efficiency}</span>
            </div>
            <div className='ships-tanks'>
                <span className='ships'>{props.planet.ships}</span>
                <span className='between'>/</span>
                <span className='tanks'>{props.planet.tanks}</span>
            </div>
            <div className='production'>
                <i {...shipsProperties}></i>
                <i {...tanksProperties}></i>
            </div>
        </div>
    );
};

export default PlanetThumb;