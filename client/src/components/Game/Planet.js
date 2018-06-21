import React from 'react';

const Planet = (props) => {
    const handlePick = () => {
        console.log(this);
        console.log('props');
        console.log(props);
        // props.actions.pickPlanet(this);
    }

    const shipsProperties = { className: "fas fa-rocket " };
    const tanksProperties = { className: "fas fa-suitcase " };

    return (
        <div className='planet-thumb' onClick={handlePick}>
            <div className='name'>{props.details.name}</div>
            <div className='eq'>
                <span className='turn'>{props.details.turn}</span>
                <span className='between'>/</span>
                <span className='efficiency'>{props.details.efficiency}</span>
            </div>
            <div className='ships-tanks'>
                <span className='ships'>{props.details.ships}</span>
                <span className='between'>({props.details.ships + 2 * props.details.tanks})</span>
                <span className='tanks'>{props.details.tanks}</span>
            </div>
            <div className='production'>
                <i {...shipsProperties}></i>
                <i {...tanksProperties}></i>
            </div>
        </div>
    );
}

export default Planet;