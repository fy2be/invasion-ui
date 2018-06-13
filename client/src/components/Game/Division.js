import React from 'react';
import PlanetThumb from './PlanetThumb';

const Division = props => (
    <div className='division'>
        <div className='division-left'>
            <PlanetThumb planet={props.division.from} />
        </div>

        <div className='division-mid'>
            <div className='top'>{props.division.name}</div>
            <div className='bottom'>
                <span className='number-of-ships'>
                    {props.division.ships}
                </span>
                <span className='icon'>
                    <i className='fas fa-rocket'></i>
                </span>
            </div>
        </div>

        <div className='division-right'>
            <PlanetThumb planet={props.division.to} />
        </div>
    </div>
);

export default Division;