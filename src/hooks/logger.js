const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf, errors} = format;

const myFormat = printf(({level, message, timestamp}) => {
    return `[${level}] ${timestamp}: ${message}`;
});

const logger = createLogger({
    level: 'error',
    format: format.combine(
        errors({ stack: true }),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
    transports: [
        new transports.File({filename: __dirname + '/../../log/error.log', level: 'error'}),
        new transports.File({filename: __dirname + '/../../log/all.log'}),
        new transports.Console
    ]
});

function bind_logger(bot){
    bot.logger = logger
}

module.exports = bind_logger