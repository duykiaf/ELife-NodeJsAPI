const _JWT = require('../common/_JWT');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-default-dnvisme-meisdnv-@";
const accessTokenTimeLife = process.env.ACCESS_TOKEN_TIME_LIFE || "1h";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-default-dnvisme-meisdnv-@";
const refreshTokenTimeLife = process.env.REFRESH_TOKEN_TIME_LIFE || "30d";

let createToken = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const accessToken = await _JWT.generateToken(user, accessTokenSecret, accessTokenTimeLife);
        const refreshToken = await _JWT.generateToken(user, refreshTokenSecret, refreshTokenTimeLife);
        return res.status(200).send(JSON.stringify({
            accessToken,
            refreshToken,
            message: "generate successfully"
        }));
    } catch (error) {
        return res.status(500).send(JSON.stringify({
            accessToken: "",
            refreshToken: "",
            message: "Error system, please try again!"
        }));
    }
}

let checkToken = async (req, res) => {
    const accessTokenFromClient = req.header('x-access-token');
    const refreshTokenFromClient = req.header('x-refresh-token');
    if (accessTokenFromClient && refreshTokenFromClient) {
        _JWT.verifyToken(accessTokenFromClient, accessTokenSecret, (decoded) => {
            // success
            req.jwtDecoded = decoded;
            console.log("checkToken: Verify access token successfully");
            res.status(200).send(JSON.stringify({
                accessToken: accessTokenFromClient,
                refreshToken: refreshTokenFromClient,
                message: "verify access token successfully"
            }));
        }, (error) => {
            console.log("checkToken: Start refresh token");
            // goi callback thay vi dung promise vi jwt.verify khong phai bat dong bo
            _JWT.verifyToken(refreshTokenFromClient, refreshTokenSecret, async (decoded) => {
                const userData = decoded.data;
                const accessToken = await _JWT.generateToken(userData, accessTokenSecret, accessTokenTimeLife);
                console.log("Refresh token successfully");
                res.status(200).send(JSON.stringify({
                    accessToken,
                    refreshToken: refreshTokenFromClient,
                    message: "refresh token successfully"
                }));
            }, (error) => {
                console.log("checkToken: Refresh token expired");
                res.status(403).send(JSON.stringify({
                    accessToken: "",
                    refreshToken: "",
                    message: "refresh token expired"
                }));
            });
        });
    } else {
        console.log("checkToken: Token not found");
        res.status(400).send(JSON.stringify({
            accessToken: "",
            refreshToken: "",
            message: "token not found"
        }));
    }

}

module.exports = {
    createToken: createToken,
    checkToken: checkToken
}