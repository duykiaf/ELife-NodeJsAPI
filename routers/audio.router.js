module.exports = function (router) {
    var audioController = require('../controllers/audio.controller');

    router.get('/audio/get-by-id/:id', audioController.getAudioById);

    router.get('/audio/get-active-audios-list-by-topic-id/:id',
        audioController.getActiveAudiosListByTopicId);

    router.post('/audio/create', audioController.addAudio);

    router.put('/audio/update', audioController.updateAudio);
}