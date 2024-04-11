const { globals } = require('./dbTransactions.js');
const CATEGORIES = globals.CATEGORIES;

function getClientParams(req) {
    return {
        client_id: req.body.client_id,
        client_name: req.body.client_name
    }
}

function getUserObj(req) {
    const { username, password } = req.body;
    return { username, password }
}

function getNewRatingObj(req) {
    const ratingObj = {
        rating_date: req.body.rating_date,
        client_id: req.body.client_id
    };

    CATEGORIES.forEach(category => {
        ratingObj[category] = req.body[category];
    });

    return ratingObj
}

function getRatingObj(req) {
    const ratingObj = {
        rating_id: req.body.rating_id,
        rating_date: req.body.rating_date,
    };

    CATEGORIES.forEach(category => {
        ratingObj[category] = req.body[category];
    });

    return ratingObj;
};

module.exports = { getClientParams, getUserObj, getNewRatingObj, getRatingObj };