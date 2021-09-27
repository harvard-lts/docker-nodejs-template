const winston = require('winston');
const path = require('path');
const os = require('os');
const hostname = os.hostname();
const rfs = require('rotating-file-stream');
require('winston-daily-rotate-file');

const logger = {};

// Console logs and errors write to file using winston
logger.console = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.DailyRotateFile(
            {
                filename: `logs/${hostname}/console/%DATE%-console.log`,
                datePattern: 'yyyy-MM-DD',
                maxSize: '20m',
                maxFiles: '14d'
            }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// API request logs write to file config
logger.requestLogStream = rfs.createStream('request.log', {
    interval: '1d', // Rotate daily
    maxFiles: 30, // Maximum number of rotated files to keep in storage
    path: path.join(__dirname, `../logs/${hostname}/request/`)
});

module.exports = logger;