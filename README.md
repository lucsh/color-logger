# Color Logger
colorful logger for node.

```
npm install --save lucsh/color-logger
```

## Example

```js
import Logger from 'colorful-logger-node';

// simple usage
Logger.v('verbose log1', 'verbose log2');

// to disable 
Logger.debug = false;

// use object
Logger.d({foo: 123, bar: [1, 2, 3]});

// all log level and colors
Logger.v('verbose log');
Logger.d('debug log');
Logger.i('info log');
Logger.w('warning log');
Logger.e('error log');
Logger.n('normal log');
Logger.t('with timestamp (same line)');
```
<img src='./misc/color-logger.png' width='600'>
## License
MIT
