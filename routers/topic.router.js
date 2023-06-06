module.exports = function(router) {
    var topicController = require('../controllers/topic.controller');

    router.get('/topic/get-by-name/:name', topicController.getByName);

    router.post('/topic/create', topicController.addTopic);

    router.put('/topic/update', topicController.updateTopic);
}