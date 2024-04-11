function isDateString(str) {
    const timestamp = Date.parse(str);
    return !isNaN(timestamp);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

async function getRatingListFromId(trx, rating_id) {
    const ratingsList = await trx
        .select('rating_id')
        .from('ratings')
        .innerJoin('clients', 'ratings.client_id', 'clients.client_id')
        .where({ "rating_id": rating_id });
    return ratingsList;
}

async function getRatingListFromDate(trx, rating_date) {
    const ratingsList = await trx
        .select('rating_id', 'ratings.client_id')
        .from('ratings')
        .innerJoin('clients', 'ratings.client_id', 'clients.client_id')
        .where({ "rating_date": rating_date });
    return ratingsList;
}

async function getRatinglist(trx, rating_param) {
    let ratingsList = null;

    if (isNumber(rating_param)) {
        const rating_id = rating_param;
        ratingsList = await getRatingListFromId(trx, rating_id);
    } else if (isDateString(rating_param)) {
        const rating_date = rating_param;
        ratingsList = await getRatingListFromDate(trx, rating_date);
    } else {
        throw new Error('rating_param must be a date string or a number');
    }
    return ratingsList;
}

async function getIsRating(trx, rating_param) {
    const ratingsList = await getRatinglist(trx, rating_param);
    const isRating = ratingsList.length > 0
    return isRating;
}

module.exports = { getIsRating }