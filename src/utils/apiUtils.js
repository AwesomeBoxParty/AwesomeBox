import clientID from '../constants/secrets.js';

SC.initialize({
  client_id: clientID
});

var apiUtils = {
  searchSoundCloud: function(str, cb) {
    SC.get('/tracks', {
      q: str
    }).then(function(tracks) {
      cb(tracks);
    });
  }
};

export default apiUtils;