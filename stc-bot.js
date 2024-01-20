const tmi = require('tmi.js');
const loginData = require('./private/login');

const client = new tmi.Client({
	options: { 
		debug: true 
	},
	connection: {
        cluster: 'aws',
        reconnect: true,
    },
	identity: {
		username: loginData.USERNAME,
		password: loginData.PASSWORD
	},
	channels: [ loginData.USERNAME ]
});

client.connect();

// Executes when client successfully connects to channel
client.on('connected', (address, port) => {
	client.say(loginData.USERNAME, "STCrawlBot is live!");
});

// Executes when user types in channel's chat
client.on('message', (channel, user, message, self) => {
	// Ignore echoed messages and non-commands.
	if(self || !message.startsWith("!")) return;

	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${user.username}, heya!`);
	}
});