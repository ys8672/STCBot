const tmi = require('tmi.js');
const { loginInfo } = require('../private/login');
const permissions = require('../utils/permissions')
const { queueCommands, stcInfoCommands } = require('../strings/commands');
const { stcInfoStrings } = require('../strings/responses')

// Creates STCrawlBot into the user's Twitch chat.
// @param {String} 'userName' Username of Twitch channel to add STCrawlBot.
// @param {String} 'userId' ID of Twitch channel to add STCrawlBot.
function buildNewBotClient(userName, userId) {
	const newBotClient = new tmi.Client({
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
		channels: [userName]
	});
	newBotClient.connect();

	newBotClient.on('message', (channel, tags, message, self) => {
		// Ignore echoed messages and non-commands.
		if(self || !message.startsWith("!")) return;

		// Streamer Only Commands
		if (permissions.isStreamer(tags)) {
		    switch(message) {
		    	case queueCommands.QOPEN:
		    		break;
		    	case queueCommands.QCLOSE:
		    		break;
				default:
					break;
		    }
		}

		// Streamer & Mods Only Commands
		if (permissions.isStreamerOrMod(tags)) {
			switch(message) {
		    	case queueCommands.QPAUSE:
		    		break;
		    	case queueCommands.QUNPAUSE:
		    		break;
		    	case queueCommands.QPICK:
		    		break;
		    	case queueCommands.QPICK3:
		    		break;
				default:
					break;
		    }
		}

		// Everybody Commands
		switch(message) {
	    	case queueCommands.QJOIN:
	    		break;
	    	case queueCommands.QLEAVE:
	    		break;
	    	case queueCommands.QPOSITION:
	    		break;
	    	case queueCommands.QSTATUS:
	    		break;
	    	case queueCommands.QINFO:
	    		break;
    		case stcInfoCommands.STCRAID:
    			newBotClient.say(channel, stcInfoStrings.STCRAID_MESSAGE);
    			break;
			case stcInfoCommands.STC:
				newBotClient.say(channel, stcInfoStrings.STC_MESSAGE);
				break;
			case stcInfoCommands.STCINFO:
				newBotClient.say(channel, stcInfoStrings.STCINFO_MESSAGE);
				break;
			case stcInfoCommands.STCPOOL:
				newBotClient.say(channel, stcInfoStrings.STCPOOL_MESSAGE);
				break;
			default:
				break;
	    }
	});
	return newBotClient;
}

module.exports = {
	buildNewBotClient
}