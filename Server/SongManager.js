var SongManager = function() {
	var songs = [];
	var songCounter = 0;

	var addSong = function(song) {
		// ADD NEW PROPERTIES:
		song.songID = songCounter;
		song.votes = 0;
		songs.push(song);
		songCounter++;
		sort();
	}

	var sort = function(songs) {
		songs.sort(compareVotes);
	}

	var compareVotes = function (s1, s2){
		return (a.votes > b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0);
	}

	var postVote = function(data) {
		var songToVote = findSongById(data.songID);
		if (songToVote != false) {
			// UPDATE VOTES!!
			songToVote.votes += data.voteNum;
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
