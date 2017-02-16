const net = require('net');
const client = net.createConnection(3000,'127.0.0.1');


client.on('connect',()=>{
	process.stdin.on('data',data=>{
		data = data.toString().trim();
		client.write(data);
	});
});
//服务器返回数据
client.on('data',data=>{
	console.log(data.toString());
});