#!/usr/local/bin/node

var _ = require('lodash');
var connect = require('connect');
var twilio = require('twilio');

var conf = require('../lib/conf.js');

var twilioClient = twilio(conf.twilio.sid, conf.twilio.token);
var app = connect();

app.use(connect.bodyParser());
app.use(connect.query());
app.use(connect.json());

app.use('/sns', function(req, res) {
	res.end();
	var toPhone = req.query.toPhone;
	var message = getMessage(conf.messagePattern, req.body);
	var twilioUrl = getTwilioUrl(conf.twilioUrlPattern, message);
	twilioClient.makeCall({
		to: toPhone,
		from: conf.fromPhone,
		url: twilioUrl
	});
});

app.use('/twilio', function(req, res) {
	res.setHeader('Content-Type', 'application/xml');
	res.write('<?xml version="1.0" encoding="UTF-8"?>');
	res.write('<Response>');
	res.write('<Say>');
	res.write('<![CDATA[');
	res.write(req.query.message);
	res.write(']]>');
	res.write('</Say>');
	res.end('</Response>');
});

function getMessage(pattern, values) {
	return pattern.replace(/\{(\w+)\}/g, function(m, token) {
		var value = values[token];
		return _.isUndefined(value) ? '' : value;
	});
}

function getTwilioUrl(urlPattern, message) {
	var urlEncodedMessage = encodeURIComponent(message);
	return urlPattern.replace('{urlEncodedMessage}', urlEncodedMessage);
}

app.listen(conf.port);
