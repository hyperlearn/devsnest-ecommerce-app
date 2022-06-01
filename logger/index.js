

const { createLogger, format, transports } = require('winston');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
  transports: [new transports.Console()],
})

exports.logger = logger;