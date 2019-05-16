'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const levelToColor = {
  n: '', // no color
  t: ' \x1b[30;46;5;82m', // cyan BG black FG
  v: ' \x1b[45m[VERBOSE]\x1b[0m', // magenta
  d: ' \x1b[44m[DEBUG]\x1b[0m', // blue
  i: ' \x1b[46m[INFO]\x1b[0m', // water
  w: ' \x1b[43m[WARN]\x1b[0m', // yellow
  e: ' \x1b[41m[ERROR]\x1b[0m' // red
};

class ColorLogger {
  constructor() {
    this._allLogs = [];
  }

  _getInfo() {
    let info;
    try {
      throw new Error();
    } catch (e) {
      const lines = e.stack.split('\n');
      const line = lines[4];
      const matched = line.match(/([\w\d\-_.]*:\d+:\d+)/);
      info = matched[1];
    }

    return info;
  }

  /**
   * clear all logs.
   */
  clearAllLogs() {
    this._allLogs = [];
  }

  /**
   * all logs
   * @type {String[]}
   */
  get allLogs() {
    return [].concat(this._allLogs);
  }

  /**
   * if false, not display log. default is true.
   */
  set debug(b) {
    this._debug = b;
  }

  /**
   * display log.
   * @param {string} level - log level. v, d, i, w, e.
   * @param {...*} msg - log message.
   * @returns {string} - formatted log message.
   * @private
   */
  _output(level) {
    const text = [];

    for (var _len = arguments.length, msg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      msg[_key - 1] = arguments[_key];
    }

    for (const m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.stringify(m, null, 2));
      } else {
        text.push(m);
      }
    }

    const color = levelToColor[level];
    const info = this._getInfo();

    const d = new Date();

    let hour = d.getHours();
    if (hour < 10) hour = `0${hour}`;
    let minutes = d.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    let sec = d.getSeconds();
    if (sec < 10) sec = `0${sec}`;
    const now = `${hour}:${minutes}:${sec}.${d.getMilliseconds()}`;
    const information = `\x1b[2m[${now}] [${info}][0m`;
    const log = `${color} ${text.join(' ')}[0m`;
    const offColorLog = `[${level.toUpperCase()}] [${now}] ${text.join(' ')} [${info}] `;

    this._allLogs.push(offColorLog);
    if (this._allLogs.length > 10000) this._allLogs.shift();

    const ts = level === 't' ? `\x1b[2m[${now}][0m` : '';
    if (this._debug) {
      if (!(level === 't' || level === 'n')) {
        console.log(information);
      }
      console.log(ts, log);
    }
    return log;
  }

  /**
   * display verbose(purple) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  v() {
    for (var _len2 = arguments.length, msg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      msg[_key2] = arguments[_key2];
    }

    return this._output.apply(this, ['v'].concat(msg));
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d() {
    for (var _len3 = arguments.length, msg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      msg[_key3] = arguments[_key3];
    }

    return this._output.apply(this, ['d'].concat(msg));
  }

  /**
   * display normal(no color) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  n() {
    for (var _len4 = arguments.length, msg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      msg[_key4] = arguments[_key4];
    }

    return this._output.apply(this, ['n'].concat(msg));
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i() {
    for (var _len5 = arguments.length, msg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      msg[_key5] = arguments[_key5];
    }

    return this._output.apply(this, ['i'].concat(msg));
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w() {
    for (var _len6 = arguments.length, msg = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      msg[_key6] = arguments[_key6];
    }

    return this._output.apply(this, ['w'].concat(msg));
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e() {
    for (var _len7 = arguments.length, msg = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      msg[_key7] = arguments[_key7];
    }

    return this._output.apply(this, ['e'].concat(msg));
  }

  /**
   * display timestamp(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  t() {
    for (var _len8 = arguments.length, msg = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      msg[_key8] = arguments[_key8];
    }

    return this._output.apply(this, ['t'].concat(msg));
  }
}

exports.ColorLogger = ColorLogger;
const logger = new ColorLogger();
logger.debug = true;
exports.default = logger;