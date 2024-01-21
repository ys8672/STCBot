// Checks if the user is the streamer.
exports.isStreamer = (user) => {
    return user.badges && 'broadcaster' in user.badges;
};

// Checks if the user is a streamer or moderator.
exports.isStreamerOrMod= (user) => {
    return user.badges && ('broadcaster' in user.badges || 'moderator' in user.badges);
};