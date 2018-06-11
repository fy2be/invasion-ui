import Telnet from 'telnet-client';

const connection = new Telnet();

const params = {
    host: 'liza.umcs.lublin.pl',
    port: 4444,
    shellPrompt: '/ # ',
    timeout: 1500
}

connection.on('ready', function(prompt) {
    console.log('prompt: ' + prompt);
    console.log('ready');
});

connection.on('timeout', function() {
    console.log('timeout');
    connection.end();
});

connection.on('close', function() {
    console.log('close');
});

connection.connect(params);