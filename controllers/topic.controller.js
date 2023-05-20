var topicModel = require('../models/topic.model');

exports.getTopicsList = function(req, res) {
    topicModel.getTopicsList(function(list) {
        res.send({list: list});
    }) 
}

exports.getById = function(req, res) {
    topicModel.getById(req.params.id, function(topic) {
        res.send({topic: topic});
    })
}

exports.getTopicsListByCategoryId = function(req, res) {
    topicModel.getTopicsListByCategoryId(req.params.id, function(list) {
        res.send({list: list});
    })
}

exports.addTopic = function(req, res) {
    var data = req.body;
    topicModel.addTopic(data, function(topic) {
        res.send({topic: topic});
    })
}

exports.updateTopic = function(req, res) {
    var data = req.body;
    topicModel.updateTopic(data, function(topic) {
        res.send({topic: topic});
    })
}