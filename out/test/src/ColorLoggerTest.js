'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ColorLogger = require('../../src/ColorLogger.js');

var _ColorLogger2 = _interopRequireDefault(_ColorLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ColorLogger:', () => {
  function test(actual, level, expect) {
    level = level.toUpperCase();
    (0, _assert2.default)(actual.includes(`[${level}]`));

    const d = new Date();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let date = d.getDate();
    if (date < 10) date = `0${date}`;
    let hour = d.getHours();
    if (hour < 10) hour = `0${hour}`;
    let minutes = d.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let sec = d.getSeconds();
    if (sec < 10) sec = `0${sec}`;
    const now = `\\[${d.getFullYear()}-${month}-${date}T${hour}:${minutes}:${sec}.\\d+Z\\]`;
    (0, _assert2.default)(actual.match(new RegExp(now)));

    (0, _assert2.default)(actual.match(/\[ColorLoggerTest.js:\d+:\d+\]/));

    (0, _assert2.default)(actual.includes(expect));
  }

  it('show log.', () => {
    let log;

    log = _ColorLogger2.default.v('verbose log');
    test(log, 'v', 'verbose log');

    log = _ColorLogger2.default.d('debug log');
    test(log, 'd', 'debug log');

    log = _ColorLogger2.default.i('info log');
    test(log, 'i', 'info log');

    log = _ColorLogger2.default.w('warning log');
    test(log, 'w', 'warning log');

    log = _ColorLogger2.default.e('error log');
    test(log, 'e', 'error log');

    log = _ColorLogger2.default.n('normal log');
    test(log, 'n', 'normal log');
  });

  it('show log with object.', () => {
    let log = _ColorLogger2.default.v({ foo: 123, bar: [1, 2, 3] });
    (0, _assert2.default)(log.includes(`{
  "foo": 123,
  "bar": [
    1,
    2,
    3
  ]
}`));
  });

  it('does not show log.', () => {
    _ColorLogger2.default.debug = false;
    const orig = console.log;
    console.log = () => {
      (0, _assert2.default)(false);
    };
    _ColorLogger2.default.e('foo');
    console.log = orig;
    _ColorLogger2.default.debug = true;
  });

  it('get all logs', () => {
    _ColorLogger2.default.clearAllLogs();
    _ColorLogger2.default.d('foo');
    _ColorLogger2.default.d('bar');
    const logs = _ColorLogger2.default.allLogs;
    (0, _assert2.default)(logs.length === 2);
    (0, _assert2.default)(logs[0].includes('foo'));
    (0, _assert2.default)(logs[1].includes('bar'));
  });
});