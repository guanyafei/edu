const net = require('net');

const server = net.createServer();

const users = [];

server.on('connection', (client) => {
    users.push(client);
    client
        .on('data', data => {
            data = data.toString();
            users.forEach(u => u.write(data));
        })
        .on('error', err => {
            console.log('客户端异常退出');
        });
});
server.listen(3000, () => {
    console.log('running.........');
});
