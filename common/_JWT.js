const jwt = require('jsonwebtoken');
const _APP = require('./_APP');

// create access token
let accessToken = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign({ data: user }, _APP.ACCESS_TOKEN, {
            algorithm: "HS256",
            expiresIn: _APP.ACCESS_TOKEN_TIME_LIFE
        }, function (err, _token) {
            if (err) {
                reject(err);
            } else {
                resolve(_token);
            }
        });
    });
}

// create refresh token
let refreshToken = function (user) {
    return new Promise(function (resolve, reject) {
        jwt.sign({ data: user }, _APP.REFRESH_TOKEN, {
            algorithm: "HS256",
            expiresIn: _APP.REFRESH_TOKEN_TIME_LIFE
        }, function (err, _token) {
            if (err) {
                reject(err);
            } else {
                resolve(_token);
            }
        });
    });
}

// check access token validity
let checkAccessToken = function(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, _APP.ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

// check refresh token validity
let checkRefreshToken = function(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, _APP.REFRESH_TOKEN, function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    checkAccessToken: checkAccessToken,
    checkRefreshToken: checkRefreshToken
}