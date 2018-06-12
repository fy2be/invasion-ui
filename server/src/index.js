var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import * as net from 'net';

var telnet = net.Socket();
var socketio;
var timer;

var status = {
    client: false,
    server: false
};

net.Socket.prototype.send = function (data) {
    status.server ? this.write(data + '\r\n') :
        console.error('Missing connection to the server. (TELNET)');
}

function toClient(event, data) {
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
    console.log('a user connected');

    if (!status.client) {
        telnet.connect(4444, 'liza.umcs.lublin.pl', function () {
            console.log('* Connecting to the server...');
        });

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
    data = data.toString().substr(0, data.length - 2);

    const event = data.split(/ (.+)/)[0]
    data = data.split(/ (.+)/)[1]

    console.log(event + ' -> ' + data);
    toClient(event, data);
});

telnet.on('connect', function () {
    console.log('* Connected!');
    status.server = true;
    toClient('TELNET_CONNECT', 'connected');
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

    socketio.on('disconnect', function () {
        console.log('user disconnected');
        telnet.end();
        status.client = false;
        clearInterval(timer);
    });
}