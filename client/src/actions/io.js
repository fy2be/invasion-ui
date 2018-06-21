export const IO_SERVER_STATUS = 'IO_SERVER_STATUS';
export const IO_LOGIN = 'IO_LOGIN';
export const IO_LIST_CHANNELS = 'IO_LIST_CHANNELS';
export const IO_JOIN_CHANNEL = 'IO_JOIN_CHANNEL';
export const IO_LEAVE_CHANNEL = 'IO_LEAVE_CHANNEL';

const ioServerStatus = status => ({
    type: IO_SERVER_STATUS,
    status
});

const ioLogin = login => ({
    type: IO_LOGIN,
    login
});

const ioListChannels = () => ({
    type: IO_LIST_CHANNELS
});

const ioJoinChannel = (channel) => ({
    type: IO_JOIN_CHANNEL,
    channel
});

const ioLeaveChannel = () => ({
    type: IO_LEAVE_CHANNEL
});

export { ioServerStatus, ioLogin, ioListChannels, ioJoinChannel, ioLeaveChannel }; 