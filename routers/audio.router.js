module.exports = function (router) {
    var audioController = require('../controllers/audio.controller');

    router.get('/audio/get-by-title/:title', audioController.getAudioByTitle);

    router.post('/audio/create', audioController.addAudio);

    router.put('/audio/update', audioController.updateAudio);
}