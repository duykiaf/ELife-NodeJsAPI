module.exports = function (router) {
    var categoryController = require('../controllers/category.controller');

    router.get('/category/get-by-id/:id', categoryController.getById);

    router.post('/category/create', categoryController.addCategory);

    router.put('/category/update', categoryController.updateCategory);
}