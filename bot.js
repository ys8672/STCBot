const tmi = require('tmi.js');
const stcBotCommandImpl = require('./commands/stc-bot-commands');
const { loginInfo } = require('./private/login');
const { stcBotCommands } = require('./strings/commands');
const { miscStrings } = require('./strings/misc')

const client = new tmi.Client({
	options: { 
		debug: true 
	},
	connection: {
        cluster: 'aws',
        reconnect: true,
    },
	identity: {
		username: loginInfo.USERNAME,
		password: loginInfo.PASSWORD
	},
	channels: [loginInfo.USERNAME]
});

client.connect();

// Executes when client successfully connects to channel
client.on('connected', (address, port) => {
	client.say( loginInfo.USERNAME, miscStrings.BOT_LIVE);
});

// Executes when user types in channel's chat
client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages and non-commands.
	if(self || !message.startsWith("!")) return;

    const userName = tags['display-name'];
    const userId = tags['user-id'];
    const props = { client, channel, userName, userId };

    switch(message) {
    	case stcBotCommands.ADD:
    		stcBotCommandImpl.addBotClient(props);
    		break;
		case stcBotCommands.REMOVE:
			stcBotCommandImpl.removeBotClient(props);
			break;
		case stcBotCommands.NAME_CHANGE:
			stcBotCommandImpl.changeUserName(props);
			break;
		default:
			break;
    }
});
