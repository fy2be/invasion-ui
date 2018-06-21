var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import * as net from 'net';

var telnet = net.Socket();
var socketio;
var timer;
var buffer = '';
var isCatching = false;

var status = {
    client: false,
    server: false
};

net.Socket.prototype.send = function (data) {
    status.server ? this.write(data + '\r\n') :
        console.error('Missing connection to the server. (TELNET)');
}

function toClient(event, data) {
    const short = data.length > 100 ? data.substr(0, 100) + '...' : data;

    if (data.type === 'IO_GAME_CONFIRM_ACTIVITY_OK') return;

    // console.log(`${event}: ${short}`);
    console.log(`% ${event} - ${data.type}`);
    status.client ? socketio.emit(event, data) :
        console.error('Missing connection to the client. (SOCKET.IO)');
}

//
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socketio = socket;
    prepareEvents();

    if (!status.client) {
        telnet.connect(4444, 'liza.umcs.lublin.pl', function () {
            console.log('* Connecting to the server...');
        }).setNoDelay();

        timer = setInterval(() => { telnet.send('CONFIRM_ACTIVITY'); }, 30000);
        status.client = true;

    } else {
        console.log('* Client is already connected.');
        socketio.disconnect();
        clearInterval(timer);
    }
});

http.listen(3333, function () {
    console.log('* Listening on *:3333');
});

// TELNET_EVENTS
telnet.on('data', function (data) {
    data = data.toString();

    const items = data.split(/ (.+)/);
    const event = items[0].trim();

    if (items.length == 1) {
        // toClient(event, '');
        toClient('action', {
            type: `IO_GAME_${event}`
        });
        return;
    }

    let msg = items[1].trim();

    if (event === 'DISTANCE_MATRIX') {
        isCatching = true;
    }

    if (event === 'PLANETS' && buffer.length > 0) {
        console.log(`Buffer: ${buffer.length}`);
        isCatching = false;

        if (buffer.indexOf('PLANETS') > -1) {
            const matrixDistanceData = buffer.substr(0, buffer.indexOf('PLANETS')).trim();
            const planetsData = buffer.substr(buffer.indexOf('PLANETS') + 'PLANETS'.length, buffer.indexOf('DIVISIONS') - buffer.indexOf('PLANETS')).trim();

            console.log(`Sending DISTANCE_MATRIX with PLANETS`);
            // toClient('DISTANCE_MATRIX', matrixDistanceData);
            toClient('action', {
                type: 'IO_GAME_DISTANCE_MATRIX',
                data: matrixDistanceData
            });
            // toClient('PLANETS', planetsData)
            toClient('action', {
                type: 'IO_GAME_PLANETS',
                data: planetsData
            });
        } else {
            console.log('Sending only DISTANCE_MATRIX...');
            // toClient('DISTANCE_MATRIX', buffer);
            toClient('action', {
                type: 'IO_GAME_DISTANCE_MATRIX',
                data: buffer
            });
        }
        buffer = '';
    }

    if (isCatching) {
        buffer = buffer.length === 0 ? msg : buffer + data;
    } else {
        // toClient(event, msg);
        toClient('action', {
            type: `IO_GAME_${event}`,
            data: msg
        });
    }
});

telnet.on('connect', function () {
    console.log('* Connected!');
    status.server = true;
    toClient('action', {
        type: 'IO_SERVER_STATUS',
        status: 'connected'
    });
});

telnet.on('error', function (err) {
    console.log(err);
    status.server = false;
    toClient('TELNET_ERROR', `error: ${err}`);
});


telnet.on('end', function (e) {
    console.log('* Connection ended with: ' + e);
    status.server = false;
    toClient('TELNET_END', 'telnet ended');
});


function prepareEvents() {
    // SOCKET-IO EVENTS
    socketio.on('action', action => {
        switch (action.type) {
            case 'IO_HELLO':
                console.log('Helllloooouuuuuuu....');
                break;

            case 'IO_LOGIN':
                console.log(`@login as: ${action.login}`);
                telnet.send(`LOGIN ${action.login}`);
                break;

            case 'IO_LIST_CHANNELS':
                console.log('@list_channels');
                telnet.send('LIST_CHANNELS');
                break;

            case 'IO_JOIN_CHANNEL':
                console.log(`@join_channel ${action.channel}`);
                telnet.send(`JOIN_CHANNEL ${action.channel}`)
                break;

            case 'IO_LEAVE_CHANNEL':
                console.log('@leave_channel');
                telnet.send('LEAVE_CHANNEL');
                break;

            default:
                console.log('Wpadlo...' + action.type);
                console.dir(action);
        }

    })


    socketio.on('login', function (login) {
        console.log('login as: ' + login);
        telnet.send(`LOGIN ${login}`);
    });

    socketio.on('list_channels', function () {
        telnet.send('LIST_CHANNELS');
    });

    socketio.on('join_channel', function (channel) {
        telnet.send(`JOIN_CHANNEL ${channel}`);
    });

    socketio.on('leave_channel', function () {
        telnet.send('LEAVE_CHANNEL');
    });

    socketio.on('change_production', function (change) {
        telnet.send(`START_PRODUCTION ${change}`);
    });

    socketio.on('send_division', function (data) {
        telnet.send(`SEND_DIVISION ${data}`);
    });

    socketio.on('disconnect', function () {
        console.log('user disconnected');
        telnet.end();
        status.client = false;
        clearInterval(timer);
    });
}