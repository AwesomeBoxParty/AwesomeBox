var Vote = require("./Vote").Vote;
var SongManager = function() {
	
	var songs = [];
	
	var addSong = function(song) {
		// ADD NEW PROPERTIES:
		song.votes = [];

		//getVoteNum calculates the total number of votes & updates the song object
		song.getVoteNum = function(){
			var votesToReturn = 0;
	   	for (var x = 0; x < this.votes.length; x++) {
					votesToReturn += this.votes[x].number; // EITHER +1/-1
			}
			this.voteSum = votesToReturn;
			return votesToReturn;
		}
		songs.push(song);
		sort();
	};

	var nextSong = function () {
		songs.shift();
	};

	var calcVotes = function () {
		for (var i=0; i<songs.length; i++) {
			songs[i].getVoteNum();
		}
	};

	var sort = function() {
		// return if there's only 1 or fewer songs
		if (songs.length <=1 ) {
			return;
		}

		// 0 indexed is currently playing song, so exclude from sort
		var currentTrack = songs.shift();
		songs.sort(compareVotes);
		songs.unshift(currentTrack);
	};
	
	var compareVotes = function (s1, s2) {
		return (s1.getVoteNum() > s2.getVoteNum()) ? -1 : ((s2.getVoteNum() > s1.getVoteNum()) ? 1 : 0);
	};
	
	var postVote = function(data) {
		var songToVote = findSongById(data.songID);
		if (songToVote !== false) {
			songToVote.votes.push(new Vote(data.userID, data.vote));
			sort();
		}
	};
	
	var findSongById = function(id) {
		for (var i = 0; i < songs.length; i++) {
			if (songs[i].id == id) {
				return songs[i];
			}
		}
		return false;
	};
	
	function contains(a, obj) {
	    for (var i = 0; i < a.length; i++) {
	        if (a[i] === obj) {
	            return i;
	        }
	    }
	    return false;
	};

	return {
		addSong : addSong,
		nextSong: nextSong,
		postVote : postVote,
		calcVotes : calcVotes,
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
