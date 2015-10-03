var Votes = function(user , number) {
	var number = number;
	var user = user;

	return {
		get number() {
            return number;
        },
        set number(num) {
        	number = num;
        },
        get user() {
            return user;
        },
        set user(us) {
        	user = us;
        }
	}
};
exports.Votes = Votes;