
var rc = require('rc');

module.exports = rc('sns-twilio', {
	messagePattern: 'A notification from AWS SNS. Subject is "{Subject}" and message is "{Message}"',
	port: 1488,
	daemon: {
		cwd: '/',
		command: '/usr/local/bin/node',
		args: ['/usr/local/lib/node_modules/sns-twilio/index.js'],
		out: '/var/log/sns-twilio.out.log',
		err: '/var/log/sns-twilio.err.log',
		pidFile: '/var/run/sns-twilio.pid'
	}
});
