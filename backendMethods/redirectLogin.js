const { verify } = require('jsonwebtoken');

function getPathname(req) {
    return req._parsedUrl.pathname;
};

function getIsLoginPath(req) {
    const pathname = getPathname(req);

    const isLoginPath = pathname === '/login';

    return isLoginPath;
};

function getIsCookie(req) {
    return req.headers.cookie !== undefined;
};

function getReqInfo(req) {
    return {
        isLoginPath: getIsLoginPath(req),
        isCookie: getIsCookie(req)
    }

};

function sendCookiesNotFound(res) {
    return res.status(401).json({
        ok: true,
        message: 'No cookies found'
    });
};

function getCookiesList(req) {
    return req.headers.cookie.split(';');
};

function getAccessToken(cookiesList) {
    let token = null;

    for (const cookie of cookiesList) {
        const trimmedCookie = cookie.trim();
        const parts = trimmedCookie.split('=');
        if (parts.length === 2 && parts[0] === 'access-token') {
            token = parts[1];
            break;
        }
    }

    return token;
};

function sendTokenNotFound(res) {
    return res.status(403).json({
        ok: true,
        message: 'Token not found.'
    });
};

function sendTokenFailed(res) {
    return res.status(401).json({
        ok: true,
        message: 'Failed to authenticate token'
    });
}

function verifyToken(token, secretKey) {
    return new Promise((resolve, reject) => {
        verify(token, secretKey, (err, decoded) => {

            if (err) reject(err);

            resolve(decoded);
        });
    });
};

const redirectLogin = async function (req, res, next) {

    const reqInfo = getReqInfo(req);

    if (reqInfo.isLoginPath) return next();
    if (!reqInfo.isCookie) return sendCookiesNotFound(res);

    const cookiesList = getCookiesList(req);
    const token = getAccessToken(cookiesList);
    if (!token) sendTokenNotFound(res);

    const secretKey = process.env.JWT_SECRET;
    try {
        const decoded = await verifyToken(token, secretKey);
        req.decoded = decoded;
        next();
    } catch (error) {
        return sendTokenFailed(res);
    };
};

module.exports = redirectLogin;