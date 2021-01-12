exports.connect = () => {

    const DiscordRPC = require('discord-rpc');
    const chalk = require('chalk');
    const {logger} = require('./logger.js');
    const clientId = '797352093064232960';
    DiscordRPC.register(clientId);
    const rpc = new DiscordRPC.Client({transport: 'ipc'});
    let timestamp;
    
    function initPresence() {
      rpc.setActivity({
        details: `Developing app...`,
        startTimestamp: timestamp,
        instance: false
      });
    }

    rpc.on('ready', () => {
      initPresence();
    });

    rpc.login({clientId}).catch(e => {
        logger('error', `An error occurred with the DiscordRPC function, the error is as follows: ${chalk.red.bold(e)}`);
    });

}
