#!/usr/local/bin/node

var sdt = require('sdt');

var conf = require('../lib/conf.js');
var daemonConf = conf.daemon;

daemonConf._ = conf._;
sdt.runCli(daemonConf);
