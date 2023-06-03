const _JWT = require('./_JWT');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-default-dnvisme-meisdnv-@";

let isAuth = async (req, res, next) => {
    const accessTokenFromClient = req.header('x-access-token');
    const refreshTokenFromClient = req.header('x-refresh-token');
    if (accessTokenFromClient && refreshTokenFromClient) {
        _JWT.verifyToken(accessTokenFromClient, accessTokenSecret, (decoded) => {
            // success
            console.log("isAuth: verify token successfully");
            req.jwtDecoded = decoded;
            next();
        }, (error) => {
            console.log(error.message);
            console.log("isAuth: unauthorized");
            res.status(401).send(JSON.stringify({
                message: "Unauthorized"
            }));
        });
    } else {
        console.log("isAuth: token not found");
        res.status(400).send(JSON.stringify({
            message: "Token not found"
        }));
    }

}

module.exports = {
    isAuth: isAuth
};