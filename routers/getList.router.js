module.exports = function (router) {
    var categoryController = require('../controllers/category.controller');
    var topicController = require('../controllers/topic.controller');
    var audioController = require('../controllers/audio.controller');

    router.get('/category/list', categoryController.getCategoriesList);

    router.get('/category/get-active-categories', categoryController.getActiveCategoriesList);

    router.get('/topic/list', topicController.getTopicsList);

    router.get('/topic/get-active-topics', topicController.getActiveTopicsList);

    router.get('/topic/list-by-category-id/:id', topicController.getTopicsListByCategoryId);

    router.get('/audio/list', audioController.getAudiosList);

    router.get('/audio/get-list-by-topic/:id', audioController.getActiveAudiosListByTopicId);

    router.get('/audio/get-by-id/:id', audioController.getAudioById);
}