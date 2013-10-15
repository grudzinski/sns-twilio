#!/usr/local/bin/node

var sdt = require('sdt');

var conf = {
    cwd: '/',
    command: '/usr/local/bin/node',
    args: ['/usr/local/lib/node_modules/sns-twilio/index.js'],
    out: '/var/log/sns-twilio.out.log',
    err: '/var/log/sns-twilio.err.log',
    pidFile: '/var/run/sns-twilio.pid'
};

sdt.start(conf, function(err, pid) {
    if (err) {
        console.log('Fail to start sns-twilio: %s', err);
        return;
    }
    console.log('sns-twilio started with pid: %s', pid);
});

sdt.getStatus(conf, function(err, status) {
    if (err) {
        console.log('Fail to get status: %s', err);
        return;
    }
    console.log('sns-twilio %s', (status ? 'is running' : 'was stopped'));
});

sdt.stop(conf, function(err, alreadyStopped) {
    if (err) {
        console.log('Fail to stop: %s', err)
        return;
    }
    console.log('sns-twilio was ' + (alreadyStopped ? 'already stopped' : 'stopped'));
});
