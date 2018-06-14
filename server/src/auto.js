import * as net from 'net';

var telnet = net.Socket();
var status = {
    server: false
};
var data;

net.Socket.prototype.send = function (data) {
    if (data !== 'CONFIRM_ACTIVITY')
        console.log(`SEND: ${data}`);
    status.server ? this.write(data + '\r\n') :
        console.error('Missing connection to the server. (TELNET)');
}

telnet.connect(4444, 'liza.umcs.lublin.pl', function () {
    console.log('Connecting...');
});

const confirmActivity = setInterval(() => {
    telnet.send('CONFIRM_ACTIVITY');
}, 3000);

telnet.on('data', function (data) {
    data = data.toString();

    const items = data.split(/ (.+)/);
    const event = items[0].trim();

    if (event === 'LOGIN_OK') {
        createChannel();
    }

    if (event === 'JOINED') {
        setTimeout(() => {
            telnet.send('START_TOURNAMENT');
        }, 2000);
    }

    if (event === 'LEFT') {
        telnet.send('LEAVE_CHANNEL');
        createChannel();
    }
});

telnet.on('connect', function () {
    console.log('* Connected!');
    status.server = true;
    telnet.send(`LOGIN autobot`);
})

function createChannel() {
    const chanName = Date.now().toString().substr(7, 13);
    telnet.send(`CREATE_CHANNEL ${chanName} 2`);
}