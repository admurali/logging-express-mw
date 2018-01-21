/* ********************************************************************
 * Logs prettified to console.
 **********************************************************************
*/

(function() {
  const { createLogger, format, transports } = require('winston');

  module.exports = {
    middleware: (config) => {
      const loggingFunc = (req, res, next) => {
      const logger = createLogger({
          level: (config && config.level) || 'info',
          transports: (config && config.transports) || ([
            new transports.Console(),
          ]),
          format: (config && config.format) || format.json(),
          exitOnError: (config && config.exitOnError) || true,
        });
      req.logger = logger;
      next();
      };
      return loggingFunc;
    }
  };
}());
