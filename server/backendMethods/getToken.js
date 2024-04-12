const { getDataReturn, getErrorReturn } = require("../returners");
const { sign } = require('jsonwebtoken');

function getIsUserObjValid(env, userObj) {
    const isUserCorrect = userObj.username === env.ADMIN_USERNAME;
    const isPasswordCorrect = userObj.password === env.ADMIN_PASSWORD;

    if (isUserCorrect && isPasswordCorrect) {
        return true;
    }
}

function _getToken(secretKey, username) {
    return sign({ username }, secretKey, {
        expiresIn: '1h',
    });
};

function getTokenTransaction(env, userObj) {

    const IsUserObjValid = getIsUserObjValid(env, userObj);
    if (!IsUserObjValid) throw new Error('Invalid username or password');

    const secretKey = env.JWT_SECRET;
    const username = userObj.username;
    const token = _getToken(secretKey, username);

    return token;
}

function getToken(env, userObj) {
    try {
        const token = getTokenTransaction(env, userObj);
        return getDataReturn('token', {
            'token': token
        });
    } catch (error) {
        return getErrorReturn(error);
    }
}

module.exports = getToken;

