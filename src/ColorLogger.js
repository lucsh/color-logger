import 'node-json-color-stringify';

const levelToColor = {
  n: '', // no color
  t: ' \x1b[46m', // green
  v: ' \x1b[45m[VERBOSE]\x1b[0m', // magenta
  d: ' \x1b[44m[DEBUG]\x1b[0m', // blue
  i: ' \x1b[46m[INFO]\x1b[0m', // water
  w: ' \x1b[43m[WARN]\x1b[0m', // yellow
  e: ' \x1b[41m[ERROR]\x1b[0m', // red
};

export class ColorLogger {
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
  _output(level, ...msg) {
    const text = [];
    for (const m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.colorStringify(m, null, 2));
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
  v(...msg) {
    return this._output('v', ...msg);
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d(...msg) {
    return this._output('d', ...msg);
  }

  /**
   * display normal(no color) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  n(...msg) {
    return this._output('n', ...msg);
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i(...msg) {
    return this._output('i', ...msg);
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w(...msg) {
    return this._output('w', ...msg);
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e(...msg) {
    return this._output('e', ...msg);
  }

  /**
   * display timestamp(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  t(...msg) {
    return this._output('t', ...msg);
  }
}

const logger = new ColorLogger();
logger.debug = true;
export default logger;
