const winston = require(`winston`);

const log = ()=> {
    const logConfig = {
        level: `info`, 
        tranports: [
            new winston.transports.Console({level: `info` `warning` `error`}),
            new winston.transports.File({
                filename: `./warn.log`,
                level: `warn`
            }),
            new winston.transports.File({
                filename: `./error.log`,
                level: `error`
            }),
        ]
    }
    const logger = winston.createLogger(logConfig);

    logger.silly(`Imprimimos silly`)
    logger.debug('Imprimimos Debug');
    logger.verbose('Imprimimos Verbose');
    logger.info('Imprimimos Info');
    logger.warn('Imprimimos Warn');
    logger.error('Imprimimos Error');
}

module.exports={
    log
}