# Logger

The boilerplate logger is a static class for logging to the console or collecting log entries and sending them to a backend service for DB storage. This logger "copies" the functionality and basic principle of the [Winston Logger](https://github.com/winstonjs/winston).

All errors within the application should already be using the Logger for errors in the `ErrorHandlerService`.

## Logging level theory

The logging levels are determined by an enum defined in the `logger.interface.ts` file. This enum does not define string values for the levels and the order of those levels is important. For example, if you define a `LOG_LEVEL` of `info`. The value of `info` is 2. So any logging events with a level of `info`(2), `warn`(1) or `error`(0) will be logged (LogLevel <= LOG_LEVEL).

## Configuration

To configure the logger for your system. The following properties/variables need to be defined:

* environment - `LOG_LEVEL`: Defines the application's logging level and is defined in `src/environments/environment.*.ts`
* logger.ts - `httpTransportPersistLevels`: Defines the log entry level that should be persisted to the database, default is `error` only
* logger.ts - `transports`: Defines the transports to use
* *-transport.ts - `logWithDate`: If true will include the current date in the logging message sent to the console/server
* *-transport.ts - `shouldPersist`: If true means entries should be persisted to the DB
* *-transport.ts - `shouldNotifyUser`: If true a modal with the error inside it will be shown to the user
* http-transport.ts - `flushThreshold`: When the number of messages reaches the number defined here, go ahead and flush the que even if the set `flushIntervalMs` hasn't been met
* http-transport.ts - `flushIntervalMs`: The number of milliseconds to wait before sending all the collected log entries to the server
* http-transport.ts - In the `flush` method, define the path to your api service endpoint where to send logs to

## Usage

There are multiple ways to use the logger, you can call `Logger.<LogLevel>(<msg>, param1, param2, ...)` or `Logger.log(LogLevel.<level>, <msg>, param1, param2, ...)`. You can include any number of parameters (param).

Here are some example usages of the logger:

```typescript
import {LogLevel} from 'src/app/core/services/logger/logger.interface';

const someObj = {foo: 'bar', bar: 'baz'};
const someOtherObj = {baz: 'bar', bar: 'foo'};
const err = new Error('Some error');
Logger.info('an info message', someObj);
Logger.debug('a debug message', someObj, someOtherObj);
Logger.error('some error occurred', err, someObj);
Logger.log(LogLevel.error, err.message, err);
```
