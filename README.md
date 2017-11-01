# logging-express-mw

[![NPM](https://nodei.co/npm/logging-express-mw.png?compact=true)](https://nodei.co/npm/logging-express-mw/)

A middleware logger for express framework that uses and accepts a customized `winston` configuration if given one.

## Installation

Install *logging-express-mw*.

```
npm install logging-express-mw --save
```

## Logging - Basic Example

### Express Integeration

In your server code, such as *app.js*:

```
const app = require('express')();
const logging = require('logging-express-mw');

// mw to write elegant apis
app.use(logging.middleware());
```

### Usage

The logging middleware can be called in any API functions or other middleware(s) with access to the ***req*** object.

For example, we can create a *getUser* endpoint such as:
```
function getUser(req, res) {
  req.logger.silly('log level - silly');
  req.logger.debug('log level - debug');
  req.logger.verbose('log level - verbose');
  req.logger.info('log level - info');
  req.logger.warn('log level - warn');
  req.logger.error('log level - error');

  ...
}
```

Based on default configuration, we will see the following output:
```
{"message":"log level - info","level":"info"}
{"message":"log level - warn","level":"warn"}
{"message":"log level - error","level":"error"}
```


## Logging - Advanced Configuration

The logging middleware uses *winston*. Before you initialize this module, you can pass a configuration object to customize logging level, format, and types of log transports.

| Name          | Default                |  Description    |
| ------------- | ---------------------- | --------------- |
| `level`       | `'info'`               | Log only if `info.level` less than or equal to this level  |   priorities            |
| `format`      | `winston.formats.json` | Formatting for `info` messages  (see: [Formats])           |
| `transports`  | `[]` _(No transports)_ | Set of logging targets for `info` messages                 |
| `exitOnError` | `true`                 | If false, handled exceptions will not cause `process.exit` |

For more information refer to *winston* documentation at https://github.com/winstonjs/winston/blob/master/README.md

### Express Integration

In the example below, we utilize the *winston* module to create our configuration object for ***logging-express-mw***.

*app.js*:
```
const { format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const loggerConfig = {
  level: 'warn',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transport: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
  ],
}

app.use(logger.middleware(loggerConfig));
```


### Usage

The logging middleware can be called in any API functions or other middleware(s) with access to the ***req*** object.

For example, we can create a *getUser* endpoint such as:
```
function getUser(req, res) {
  req.logger.silly('log level - silly');
  req.logger.debug('log level - debug');
  req.logger.verbose('log level - verbose');
  req.logger.info('log level - info');
  req.logger.warn('log level - warn');
  req.logger.error('log level - error');

  ...
}
```

Based on the custom configuration above, we will see the following output:
```
2017-10-28T22:46:09.853Z [right meow!] silly: log level - silly
2017-10-28T22:46:09.853Z [right meow!] debug: log level - debug
2017-10-28T22:46:09.853Z [right meow!] verbose: log level - verbose
2017-10-28T22:46:09.853Z [right meow!] info: log level - info
2017-10-28T22:46:09.853Z [right meow!] warn: log level - warn
2017-10-28T22:46:09.853Z [right meow!] error: log level - error
```
