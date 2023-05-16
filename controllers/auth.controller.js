const _JWT = require('../common/_JWT');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-default-dnvisme-meisdnv-@";
const accessTokenTimeLife = process.env.ACCESS_TOKEN_TIME_LIFE || "1m";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-default-dnvisme-meisdnv-@";
const refreshTokenTimeLife = process.env.REFRESH_TOKEN_TIME_LIFE || "5m";

let createToken = async (req, res) => {
    try {
        // fake user
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const accessToken = await _JWT.generateToken(user, accessTokenSecret, accessTokenTimeLife);
        const refreshToken = await _JWT.generateToken(user, refreshTokenSecret, refreshTokenTimeLife);
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json(error);
    }
}

let refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;

    if (!refreshTokenFromClient) {
        return res.status(403).send({
            message: 'No token provided.',
        });
    } else {
        try {
            // Verify kiểm tra tính hợp lệ của refreshToken và lấy dữ liệu giải mã decoded 
            const decoded = await _JWT.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            // lấy thông qua biến decoded.data
            // console.log(decoded);
            const userData = decoded.data;

            // Thực hiện tạo mã Token trong bước gọi refresh Token
            const accessToken = await _JWT.generateToken(userData, accessTokenSecret, accessTokenTimeLife);

            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            console.log(error);
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    }
}

module.exports = {
    createToken: createToken,
    refreshToken: refreshToken,
}