const winston = require ('winston');
const Config = require ('../config');

const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint } = format;
const { Console, File } = transports;

const logConfiguration = {
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [new Console({ level: 'info' })],
};

const login = createLogger(logConfiguration);

if (Config.NODE_ENV !== 'development') {
  login.add(
    new File({
      filename: './logs/errors.log',
      level: 'error',
    }),
  );

  login.add(
    new File({
      filename: './logs/logs.log',
    }),
  );
}

module.exports = login;