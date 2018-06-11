import React from 'react';

const Channel = props => (
    <div onClick={() => { props.handleJoin(props.name) }}>
        {props.name}
    </div>
);

export default Channel;