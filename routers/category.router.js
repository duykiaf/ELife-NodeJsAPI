module.exports = function (router) {
    var categoryController = require('../controllers/category.controller');

    router.get('/category/get-by-name/:name', categoryController.getByName);

    router.post('/category/create', categoryController.addCategory);

    router.put('/category/update', categoryController.updateCategory);
}