const { stcBotStrings } = require('../strings/responses');
const { concatUserNameMessage } = require('../utils/string-builder')

// This file includes the implementation of every 
// command that a user can type in the STCrawlBot chat. 

// Current list of all users with STCrawlBot in their Twitch chat.
// Object key will be 'userId', value will be 'client'.
const currentBotClients = {};

// Implementation when user types '!add'.
// Adds STCrawlBot to 'userName' Twitch chat.
const addBotClient = ({ client, channel, userName, userId }) => {
	if (userId in currentBotClients) {
		client.say(channel, concatUserNameMessage(userName, stcBotStrings.ADD_BOT_FAILURE));
	} else {
		client.say(channel, concatUserNameMessage(userName, stcBotStrings.ADD_BOT_SUCCESS));
	}
};

// Implementation when user types '!remove'.
// Removes STCrawlBot from 'userName' Twitch chat.
const removeBotClient = ({ client, channel, userName, userId }) => {
	if(userId in currentBotClients) {
		client.say(channel, concatUserNameMessage(userName, stcBotStrings.REMOVE_BOT_SUCCESS));
	} else {
		client.say(channel, concatUserNameMessage(userName, stcBotStrings.REMOVE_BOT_FAILURE));
	}
};

module.exports = {
	addBotClient,
	removeBotClient
}