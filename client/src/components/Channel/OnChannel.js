import React from 'react';

const OnChannel = props => (
    <div>
        Users: {props.users}
        <div onClick={props.handleLeaveChannel}>
            Click to leave
        </div>
    </div>
);

export default OnChannel;