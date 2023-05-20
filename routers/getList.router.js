module.exports = function(router) {
    var categoryController = require('../controllers/category.controller');
    var topicController = require('../controllers/topic.controller');
    var audioController = require('../controllers/audio.controller');

    router.get('/category/list', categoryController.getCategoriesList);

    router.get('/topic/list', topicController.getTopicsList);

    routter.get('/topic/list-by-category-id', topicController.getTopicsListByCategoryId);

    router.get('/audio/list', audioController.getAudiosList);
}