import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {time: new Date().toISOString()},
    transports: [
        new winston.transports.File({filename: 'storage/logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'storage/logs/combined.log'}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;