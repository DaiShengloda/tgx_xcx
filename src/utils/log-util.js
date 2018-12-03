/**
 * 日志记录工具
 * @author 曹杰
 */
import {config} from '../const'
// 定义优先级
const priority = ['DEBUG', 'INFO', 'WARN', 'ERROR']

// 判断日志是否启用
function LogEnable(t = 'WARN') {
  return priority.indexOf(t) >= priority.indexOf(config.LogLevel)
}

// Logger 对象 new Logger('dakaModule');
function Logger(moduleName) {
  this.moduleName = moduleName
}

// debug
Logger.prototype.debug = function(msg, ...param) {
  LogEnable('DEBUG') && console.log(`[DEBUG]${this.moduleName}:${msg}`, param)
}
// info
Logger.prototype.info = function (msg, ...param) {
  LogEnable('INFO') && console.info(`[INFO]${this.moduleName}:${msg}`, param)
}
// warn
Logger.prototype.warn = function (msg, ...param) {
  LogEnable('WARN') && console.warn(`[WARN]${this.moduleName}:${msg}`, param)
}
// error
Logger.prototype.error = function (msg, ...param) {
  LogEnable('ERROR') && console.error(`[ERROR]${this.moduleName}:${msg}`, param)
}

module.exports = {
  getLogger: function(moduleName) {
    return new Logger(moduleName)
  }
}
