import React from 'react';

const CreateDivision = props => {
    return (
        <div className='division'>
            <div className='division-left'>
                {props.game.send.from}
            </div>

            <div className='division-mid'>
                <div className='top'>
                    <span className='dec'><i className='fas fa-arrow-down'></i></span>
                    <span className='number-of-ships'>{props.game.send.ships}</span>
                    <span className='inc'><i className='fas fa-arrow-up'></i></span>
                    <span className='icon'>
                        <i className='fas fa-rocket'></i>
                    </span>
                </div>
                <div className='bottom'>
                    <span className='timeleft'>
                        {props.game.send.distance}
                    </span>
                    <span className='icon'>
                        <i className='fas fa-clock'></i>
                    </span>
                </div>
            </div>

            <div className='division-right'>
                {props.game.send.to}
            </div>
        </div>
    );
};

export default CreateDivision;