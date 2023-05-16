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

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};