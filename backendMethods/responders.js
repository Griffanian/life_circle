const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

function sendError(res, error, code = 500) {
    // console.log(error);
    return res.status(code).send({
        ok: false,
        error
    });
}

function sendData(res, data, code = 200) {
    const responseObject = {
        ok: true,
        ...data
    };
    delete responseObject.success
    return res.status(code).send(responseObject);
}

function sendResponse(res, dbRes) {
    // console.log('dbRes', dbRes);
    if (dbRes.success) {
        return sendData(res, dbRes);
    } else {
        return sendError(res, dbRes.error);
    }
}

function sendAccessToken(res, token) {
    res.cookie('access-token', token, config.cookie_options)
    return res.status(200).send({
        ok: true,
        message: 'User successfully logged in'
    });
}

function sendLoggedIn(res, username) {
    res.status(200).send({
        ok: true,
        loggedIn: true,
        message: 'connection established',
        username
    });
};

module.exports = { sendResponse, sendAccessToken, sendLoggedIn };
