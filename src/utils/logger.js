import winston from 'winston';

// define the custom settings for each transport (file, console)
const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const logDebug = (message, meta) => logger.debug(message, meta);
export const logInfo = (message, meta) => logger.info(message, meta);
export const logWarning = (message, meta) => logger.warn(message, meta);
export const logError = (message, meta) => logger.error(message, meta);

export default logger;
