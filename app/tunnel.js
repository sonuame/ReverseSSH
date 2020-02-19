var tunnel = require('reverse-tunnel-ssh');

const { host, uname, passwd, from, to } = {
    host : process.argv[2],
    uname : process.argv[3],
    passwd : process.argv[4],
    from : process.argv[5],
    to : process.argv[6],
}


let tunnel_config = {
    username: uname,
    password: passwd,
    host: host,
    dstHost:"0.0.0.0",
    dstPort: from,
    srcHost : "localhost",
    srcPort : to
}


var server = tunnel(tunnel_config, (error, clientConnection) => {
    console.log(clientConnection._forwarding);
});

 // Use a listener to handle errors outside the callback
 server.on('error', function(err){
     console.error('Something bad happened:', err);
 });