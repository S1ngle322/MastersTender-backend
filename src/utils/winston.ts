const { createLogger, format, transports } = require('winston');
const { combine } = format;

export default createLogger({
  format: combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info: { [x: string]: any; timestamp: any; level: any; message: any; })  => {
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`;
    })
  ),
  transports: [new transports.Console()]
});

