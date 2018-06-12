import React from 'react';

const Planet = props => (
    <div className='player-planets-item'>
        <div className='name'>{props.planet.name}</div>
        <div className='eq'>{props.planet.efficiency}</div>
        <div className='ships-tanks-turn'>
            <div className='ships-tanks'>
                <div className='ships'>{props.planet.ships}</div>
                <div className='between'>|</div>
                <div className='tanks'>{props.planet.tanks}</div>
            </div>
            <div className='turn'>{props.planet.turn}</div>
        </div>
        <div className='ships-tanks'>
            <i className='fas fa-rocket'></i>
            <i className='fas fa-suitcase'></i>
        </div>
    </div>
);

export default Planet;