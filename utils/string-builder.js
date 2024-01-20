// Concatenate userName and message together into single string.
// @param {String} 'userName' Twitch user name.
// @param {String} 'message' Message to reply back to user.
function concatUserNameMessage(userName, message) {
	return `@${userName} ${message}`;
}

module.exports = {
	concatUserNameMessage
};