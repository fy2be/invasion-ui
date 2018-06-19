import React from 'react';

const SortComponent = props => (
    <div className='planet-thumb'>
        <button onClick={() => { props.handleChangeSortMethod('efficiency') }}>by efficiency</button>
        <button onClick={() => { props.handleChangeSortMethod('army') }}>by army</button>
    </div>
);

export default SortComponent;