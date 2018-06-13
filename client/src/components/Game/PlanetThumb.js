import React from 'react';

const PlanetThumb = props => (
    <div className='planet-thumb'>
        <div className='name'>{props.planet.name}</div>
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
            <i className={"fas fa-rocket " + (props.planet.production === 1 ? 'active' : '')}></i>
            <i className={"fas fa-suitcase " + (props.planet.production === 2 ? 'active' : '')}></i>
        </div>
    </div>
);

export default PlanetThumb;