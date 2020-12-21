const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');

let date = new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' });
let logDate = date.substring(0, date.length - 3).replace(/:/gi, "-").replace(/\//g, "-").replace(/(, )/g, "-")+"PM"
let levelsFormat = {
    info: `${chalk.hex("#32a852").bold('[')}${chalk.hex("#58d179").bold('INFO')}${chalk.hex("#32a852").bold(']')}`,
    debug: `${chalk.hex("#378ea3").bold('[')}${chalk.hex("#60b1c4").bold('DEBUG')}${chalk.hex("#378ea3").bold(']')}`,
    database: `${chalk.hex("#3f398f").bold('[')}${chalk.hex("#665fb8").bold('DATABASE')}${chalk.hex("#3f398f").bold(']')}`,
    warn: `${chalk.hex("#aba611").bold('[')}${chalk.hex("#f0ea43").bold('WARN')}${chalk.hex("#aba611").bold(']')}`,
    error: `${chalk.hex("#96210c").bold('[')}${chalk.hex("#f05d43").bold('ERROR')}${chalk.hex("#96210c").bold(']')}`
}
logDate = chalk.hex("#2e2e2e").bold('[') + chalk.hex("#7a7a7a").bold(logDate) + chalk.hex("#2e2e2e").bold(']');

let error = createLogger({
    transports: [
        new transports.Console()
    ],
    format: format.printf(log => `${logDate}${levelsFormat.error} ${log.message}`)
});

let warn = createLogger({
    transports: [
        new transports.Console()
    ],
    format: format.printf(log => `${logDate}${levelsFormat.warn} ${log.message}`)
});

let database = createLogger({
    transports: [
        new transports.Console()
    ],
    format: format.printf(log => `${logDate}${levelsFormat.database} ${log.message}`)
});

let debug = createLogger({
    transports: [
        new transports.Console()
    ],
    format: format.printf(log => `${logDate}${levelsFormat.debug} ${log.message}`)
});

let info = createLogger({
    transports: [
        new transports.Console()
    ],
    format: format.printf(log => `${logDate}${levelsFormat.info} ${log.message}`)
});

async function logger(level, args){
    try{
        switch(level){
            case 'error':
                error.log({level: 'info', message: args});
                break;
            case 'warn':
                warn.log({level: 'info', message: args});
                break;
            case 'database':
                database.log({level: 'info', message: args});
                break;
            case 'debug':
                debug.log({level: 'info', message: args});
                break;
            case 'info':
                info.log({level: 'info', message: args});
                break;
        }
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    logger
}
