let isAuth = async function (req, res, next) {
    var _JWT = require('./_JWT')
    var _accessToken = req.headers.authorization;
    var _refreshToken = req.headers.refreshtoken;
    if (_accessToken || _refreshToken) {
        try {
            var authData = await _JWT.checkAccessToken(_accessToken);
            req.auth = authData;
            next();
        } catch (err) {
            return res.send({Error: 'Token not valid!'})
        }
    } else {
        return res.send({Error: 'Error attaching token!'})
    }
};

module.exports = { isAuth: isAuth }

// chua co router create token