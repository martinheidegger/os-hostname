'use strict'
var tap = require('tap')
var exec = require('child_process').exec
var hostname = require('..')

if (process.platform === 'win32') {
  tap.test('basic windows test', function (t) {
    process.env.COMPUTERNAME = 'bugcontainer'
    hostname.invalidate()
    hostname(function (err, hostname) {
      t.equal(err, null)
      t.equal(hostname, 'bugcontainer')
      t.end()
    })
  })

  tap.test('fallback windows test', function (t) {
    delete process.env.COMPUTERNAME
    hostname.invalidate()
    exec('hostname', function (err, hostnameResponse) {
      t.equal(err, null)
      hostname(function (err, hostname) {
        t.equal(err, null)
        t.equal(hostname, hostnameResponse.trim())
        t.end()
      })
    })
  })
} else {
  tap.test('basic unix test', function (t) {
    process.env.HOSTNAME = 'bugcontainer'
    hostname.invalidate()
    hostname(function (err, hostname) {
      t.equal(err, null)
      t.equal(hostname, 'bugcontainer')
      t.end()
    })
  })

  tap.test('fallback unix test', function (t) {
    delete process.env.HOSTNAME
    hostname.invalidate()
    exec('hostname', function (err, hostnameResponse) {
      t.equal(err, null)
      hostname(function (err, host) {
        t.equal(err, null)
        t.equal(host, hostnameResponse.trim())
        t.end()
      })
    })
  })
}
