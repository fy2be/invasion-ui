import React from 'react';
import Channel from './Channel';

class ChannelsList extends React.Component {
    render() {
        const channelsArray = [];

        if (this.props.channels) {
            this.props.channels.forEach((channel, index) => {
                channelsArray.push(<Channel key={index} name={channel} handleJoin={this.props.handleJoin} />);
            });

            return (
                <div>
                    <h3>Channels:</h3>
                    {channelsArray}
                </div>
            );
        }

        return null;
    }
}

export default ChannelsList;