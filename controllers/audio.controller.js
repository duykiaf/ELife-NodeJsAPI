var audioModel = require('../models/audio.model');

exports.getAudiosList = function (req, res) {
    audioModel.getAudiosList(function (audios) {
        res.send(audios);
    })
}

exports.getAudioById = function (req, res) {
    audioModel.getAudioById(req.params.id, function (audio) {
        res.send(audio);
    })
}

exports.getAudioByTitle = function (req, res) {
    audioModel.getAudioByTitle(req.params.title, function (audio) {
        res.send(audio);
    })
}

exports.getActiveAudiosListByTopicId = function (req, res) {
    audioModel.getActiveAudiosByTopicId(req.params.id, function (audios) {
        res.send(audios);
    })
}

exports.addAudio = function (req, res) {
    var data = req.body;
    audioModel.addAudio(data, function (audio) {
        res.send(audio);
    })
}

exports.updateAudio = function (req, res) {
    var data = req.body;
    audioModel.updateAudio(data, function (audio) {
        res.send(audio);
    })
}
