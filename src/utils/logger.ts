/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

export const logDebug = (message: string, meta?: any) => logger.debug(message, meta);
export const logInfo = (message: string, meta?: any) => logger.info(message, meta);
export const logWarning = (message: string, meta?: any) => logger.warn(message, meta);
export const logError = (message: string, meta?: any) => logger.error(message, meta);

export default logger;