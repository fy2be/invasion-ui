import React from 'react';

import ChannelItem from '../../components/Channel/Item';

class ChanList extends React.Component {
    componentDidMount() {
        this.props.actions.ioListChannels();
        this.timer = setInterval(this.props.actions.ioListChannels, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                <h1>Channels:</h1>
                {
                    this.props.channels.map(channel =>
                        <ChannelItem
                            key={channel}
                            name={channel}
                            {...this.props}
                        />
                    )
                }
            </div>
        );
    }
}

export default ChanList;