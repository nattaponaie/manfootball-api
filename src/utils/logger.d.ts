import winston from 'winston';
declare const logger: winston.Logger;
export declare const logDebug: (message: string, meta?: any) => winston.Logger;
export declare const logInfo: (message: string, meta?: any) => winston.Logger;
export declare const logWarning: (message: string, meta?: any) => winston.Logger;
export declare const logError: (message: string, meta?: any) => winston.Logger;
export default logger;
