import axios from 'axios'

async function glogger(data) {
    await axios.put('http://localhost:3000', data)
}

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

setInterval(async () => {
    glogger(payload)
}, 2000)