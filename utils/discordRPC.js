let appOptions = require('../appOptions.json');
const DiscordRPC = require('discord-rpc');
const chalk = require('chalk');
const {logger} = require('./logger.js');
const clientId = '797352093064232960';
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({transport: 'ipc'});
let timelapse = new Date().getTime();

function initPresence() {
  rpc.setActivity({
    details: `idle`,
    state: `Beta ${appOptions.appVersion}`,
    startTimestamp: timelapse,
    largeImageKey: 'nedramicon',
    largeImageText: 'https://github.com/KloutDevs/Nedram/',
    instance: false
  });
}

rpc.on('ready', () => {
  initPresence();
});

let connectPromise = new Promise(async (resolve, reject) => {
    rpc.login({clientId}).then((Client) => {
        resolve(Client);
    }).catch(e => {
        logger('error', `An error occurred with the DiscordRPC function, the error is as follows: ${chalk.red.bold(e)}`);
        resolve(e.message);
    });
});

let getClient = new Promise(async (resolve, reject) => {
    await connectPromise.then(async (Client, type) => {
        resolve(Client);
    });
});


module.exports = {
    connectPromise,
    getClient
}
