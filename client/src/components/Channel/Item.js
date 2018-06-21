import React from 'react';

const ChannelItem = (props) => {
    const handleClick = () => {
        props.actions.ioJoinChannel(props.name);
    }

    return (
        <div onClick={handleClick}>{props.name}</div>
    );
};

export default ChannelItem;