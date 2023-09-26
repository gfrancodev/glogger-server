import io from 'socket.io-client';

const serverAddress = 'http://127.0.0.1:3005/capture';

const payload = {
    priority: 1,
    type: 'INFO',
    ip: '192.168.1.100',
    hostname: 'my-host',
    program: 'my-app',
    pid: 12345,
    message: 'This is an informational log message.',
    data: {
        key1: 'value1',
        key2: 'value2',
    },
};

const socket = io(serverAddress);

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('capture', payload);
});


socket.on('disconnect', () => {
    console.log('Connection closed');
});
