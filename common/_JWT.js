const jwt = require('jsonwebtoken');
require('dotenv').config();

let generateToken = (user, secretSignature, tokenTimeLife) => {
    return new Promise((resolve, reject) => {
        // Thực hiện ký và tạo token
        jwt.sign(
            { data: user },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenTimeLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
}

const verifyToken = (token, secret, onSuccess, onFailed) => {
    jwt.verify(token, secret, (error, decode) => {
        if (error) {
            onFailed(error);
            return;
        }
        onSuccess(decode);
    })
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};