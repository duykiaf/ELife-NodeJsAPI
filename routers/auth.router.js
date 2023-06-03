module.exports = function(router) {
    var authController = require('../controllers/auth.controller');

    router.post("/create_token", authController.createToken);
    router.post("/check_token", authController.checkToken);
}