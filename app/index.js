let config = require("./config.json");
let ssh = require('node-ssh');
let atob = require('atob');
let connections = [];
let ParseText = require('./parseText');
let str_parser = new ParseText();
let spawn = require('child_process');
let pass = process.argv[2];

let execCommand = async (connection, server, command) => {
    console.log(command);
    return await connection.exec('sudo', command, { stdin : atob(server.password) + '\n', options : {pty : true}});
}

let simple_ssh = () => {
    config.servers.forEach(server => {
        let connection = new ssh();
        let commands = 0;
        connection.connect({
            host : server.host,
            username : server.username,
            password : atob(server.password)
        }).then(() => {
            let commands_execution = (index) => {
                if(server.commands[index]){
                    execCommand(connection, server, server.commands[index])
                    .then(success => {
                        index++;
                        console.log(str_parser.tableizeString(success, ['Active Internet connections','Proto Recv-Q','COMMAND']))
                        commands_execution(index);
                    }).catch(err => {
                        console.log(err);
                        connection.dispose();
                    });
                }
                else{
                    connection.dispose();
                }
            }
            commands_execution(0);
        })
    });
}

config.servers.forEach(server => {
    server.port_forwards.forEach(forwarder => {
        let args = `${server.host} ${server.username} ${ !pass ? atob(server.password) : pass} ${forwarder.from} ${forwarder.to}`; 
        console.log(`forwarding ${server.host} ${forwarder.from} to ${forwarder.to}`);
        spawn.exec('node ./app/tunnel ' + args, { stdio: 'inherit' });
    })
})