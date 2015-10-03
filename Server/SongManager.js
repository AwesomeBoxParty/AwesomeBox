var Vote = require("./Vote.js").Vote;
var SongManager = function() {
	var songs = [];
	var songCounter = 0;

	var addSong = function(song) {
		// ADD NEW PROPERTIES:
		song.songID = songCounter;
		song.votes = [];
		song.getVoteNum = function(){
			var votesToReturn = 0;
			for (var i = 0; i < votes.length; ++i) {
				votesToReturn += votes[i].number; // EITHER +1/-1
			}
			return votesToReturn;
		}
		songs.push(song);
		songCounter++;
		sort();
	}

	var sort = function(songs) {
		songs.sort(compareVotes);
	}

	var compareVotes = function (s1, s2) {
		return (s1.getVoteNum() > s2.getVoteNum()) ? 1 : ((s2.getVoteNum() > s1.getVoteNum()) ? -1 : 0);
	}

	var postVote = function(data) {
		var songToVote = findSongById(data.songID);
		if (songToVote != false) {
			songToVote.votes.push(new Vote(data.userID, data.vote));
			sort();
		}
	}

	var findSongById = function(id) {
		for (var i = 0; i < songs.length; i++) {
			if (songs[i].songId == id) {
				return songs[i];
			}
		}
		return false;
	}
	
	function contains(a, obj) {
	    for (var i = 0; i < a.length; i++) {
	        if (a[i] === obj) {
	            return i;
	        }
	    }
	    return false;
	}

	return {
		addSong : addSong,
		postVote : postVote,
		sort : sort,
		get songs() {
            return songs;
        },
        set songs(s) {
        	songs = s;
        }
	}
};
exports.SongManager = SongManager;
