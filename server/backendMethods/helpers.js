const { globals } = require('./dbTransactions.js');
const { validateID, validateClientName, validateDate } = require('./dbTransactions.js');
const { getDataReturn, getErrorReturn } = require('../backendMethods/returners.js');
const { get } = require('../routes/ratings.js');

const CATEGORIES = globals.CATEGORIES;

function getClientID(req) {
    const { client_id } = req.params;
    try {
        validateID(client_id);
        return getDataReturn('clientId', { clientId: client_id });
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getClientName(req) {
    const { client_name } = req.body;
    try {
        validateClientName(client_name);
        return getDataReturn('client_name', { client_name });
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getClientParams(req) {
    const { client_id } = getClientID(req);
    const { client_name } = getClientName(req);
    return {
        client_id,
        client_name
    };
};

function getRatingID(req) {
    const { rating_id } = req.params;
    try {
        validateID(rating_id);
        return getDataReturn('ratingId', { ratingId: rating_id });
    } catch (error) {
        return getErrorReturn(error);
    }
};

function getRatingDate(req) {
    const { rating_date } = req.body;
    try {
        validateDate(rating_date);
        return getDataReturn('ratingDate', { ratingDate: rating_date });
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getCategories(req) {
    const categories = {};
    try {
        for (const category of CATEGORIES) {
            if (isNaN(req.body[category])) {
                throw new Error(`Invalid value for ${category}`);
            }
            categories[category] = req.body[category];
        };
        return getDataReturn('categories', categories);
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getUserObj(req) {
    const { username, password } = req.body;
    return { username, password }
}

function getNewRatingObj(req) {
    const ratingDateRes = getRatingDate(req);
    const clientIDRes = getClientID(req);
    const categories = getCategories(req);

    const ratingObj = {
        rating_date: ratingDateRes.ratingDate,
        client_id: clientIDRes.client_id,
        ...categories
    };

    return ratingObj;
}

function getRatingObj(req) {
    const ratingIDRes = getRatingID(req);
    const ratingDateRes = getRatingDate(req);
    const categoriesRes = getCategories(req);

    const ratingObj = {
        ratingId: ratingIDRes.ratingId,
        ratingDate: ratingDateRes.ratingDate,
        categories: categoriesRes.categories
    };

    return getDataReturn('ratingObj', ratingObj);
};

module.exports = {
    getClientID,
    getClientName,
    getClientParams,
    getRatingID,
    getUserObj,
    getNewRatingObj,
    getRatingObj
};