import React from 'react';
import PlanetThumb from './PlanetThumb';

const Division = props => (
    <div className='division'>
        <div className='division-left'>
            <PlanetThumb planet={props.division.from} />
        </div>

        <div className='division-mid'>
            <div className='top'>
                <span className='from'>{props.division.name}</span>
                <span className="between"><i className='fas fa-arrow-right'></i></span>
                <span className='to'>{props.division.to.owner}</span>
            </div>
            <div className='bottom'>
                <span className='number-of-ships'>
                    {props.division.ships}
                </span>
                <span className='icon'>
                    <i className='fas fa-rocket'></i>
                </span>
                <span className='timeleft'>
                    {props.division.timeleft}
                </span>
                <span className='icon'>
                    <i className='fas fa-clock'></i>
                </span>
            </div>
        </div>

        <div className='division-right'>
            <PlanetThumb planet={props.division.to} />
        </div>
    </div>
);

export default Division;