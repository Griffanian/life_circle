const { globals } = require('./dbTransactions.js');
const { validateID, validateClientName, validateDate } = require('./dbTransactions.js');
const { getDataReturn, getErrorReturn } = require('../backendMethods/returners.js');

const CATEGORIES = globals.CATEGORIES;

function getClientIDFromReq(req) {
    let client_id;

    if (req.params.client_id) {
        client_id = req.params.client_id;
    } else if (req.body.client_id) {
        client_id = req.body.client_id;
    } else {
        throw new Error('No client id provided');
    }

    return client_id;
}

function getClientID(req) {
    try {
        const client_id = getClientIDFromReq(req);
        validateID(client_id);
        return getDataReturn('clientId', { clientId: client_id });
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getClientName(req) {
    const client_name = req.body.client_name;
    try {
        validateClientName(client_name);
        return getDataReturn('clientName', { "clientName": client_name });
    } catch (error) {
        return getErrorReturn(error);
    };
};

function getClientParams(req) {
    const { client_id } = getClientID(req);
    const { client_name } = getClientName(req);
    const client_params = {
        client_id,
        client_name
    };
    return getDataReturn('clientParams', client_params);
};

function getRatingIDFromReq(req) {
    let rating_id;

    if (req.params.rating_id) {
        rating_id = req.params.rating_id;
    } else if (req.body.rating_id) {
        rating_id = req.body.rating_id;
    } else {
        throw new Error('No client id provided');
    }

    return rating_id;
}

function getRatingID(req) {
    const rating_id = getRatingIDFromReq(req);
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
            const catValue = parseInt(req.body[category], 10);

            if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(catValue)) {
                throw new Error(`Invalid value ${req.body[category]} for ${category}`);
            }

            categories[category] = catValue;
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
        rating_date: ratingDateRes.rating_date,
        client_id: clientIDRes.client_id,
        ...categories
    };

    return ratingObj;
}

function getRatingObj(req) {
    const ratingIDRes = getRatingID(req);
    const ratingDateRes = getRatingDate(req);
    const categoriesRes = getCategories(req);

    const { success, message, ...categories } = categoriesRes
    const ratingObj = {
        ratingId: ratingIDRes.rating_id,
        ratingDate: ratingDateRes.rating_date,
        ...categories
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