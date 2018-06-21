import React from 'react';

const Division = props => {
    const planetFrom = props.planets.find(planet => planet.props.details.name === props.details.from);
    const planetTo = props.planets.find(planet => planet.props.details.name === props.details.to);

    console.log('planetfrom');
    console.log(planetFrom);
    console.log('planetto');
    console.log(planetTo);

    return (
        <div className='division'>
            <div className='division-left'>
                {planetFrom}
            </div>

            <div className='division-mid'>
                <div className='top'>
                    <span className='from'>{props.details.name}</span>
                    <span className="between"><i className='fas fa-arrow-right'></i></span>
                    <span className='to'>{planetTo.owner}</span>
                </div>
                <div className='bottom'>
                    <span className='number-of-ships'>
                        {props.details.ships}
                    </span>
                    <span className='icon'>
                        <i className='fas fa-rocket'></i>
                    </span>
                    <span className='timeleft'>
                        {props.details.timeleft}
                    </span>
                    <span className='icon'>
                        <i className='fas fa-clock'></i>
                    </span>
                </div>
            </div>

            <div className='division-right'>
                {planetTo}
            </div>
        </div>
    );
};

export default Division;