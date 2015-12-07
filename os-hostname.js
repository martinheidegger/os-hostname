'use strict'

var isWindows = process.platform === 'win32'
var method

module.exports = function (cb) {
  if (!method) {
    method = require('exec-fallback')(function () {
      return isWindows ? process.env.COMPUTERNAME : process.env.HOSTNAME
    }, 'hostname')
  }
  method(cb)
}
