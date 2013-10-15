# sns-twilio

A gateway between AWS SNS and your phone

## How to configure?

Implementeed using [rc](https://github.com/dominictarr/rc).


```json
{
	"twilio": {
		"sid": "ACCOUNT_SID",
		"token": "AUTH_TOKEN"
	},
	"fromPhone": "+97243729031",
	"messagePattern": "A notification from AWS SNS. Subject is '{Subject}' and message is '{Message}'",
	"port": 1488,
	"twilioUrlPattern": "http://example.com:1488/twilio?message={urlEncodedMessage}"
}
```

## How to run?

Runs as daemon using [sdt](https://github.com/grudzinski/sdt).

```sh
sudo npm install sns-twilio -g
sns-twilio
```
