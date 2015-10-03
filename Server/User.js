var User = function(userID) {
	var userID = userID;

	return {
		get userID() {
            return userID;
        },
        set userID(uID) {
        	userID = uID;
        }
	}
};
exports.User = User;