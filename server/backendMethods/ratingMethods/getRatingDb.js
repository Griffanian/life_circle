const { db, globals } = require('../dbTransactions.js');
const { getDataReturn, getErrorReturn } = require("../../returners.js");
const CATEGORIES = globals.CATEGORIES;

async function getIsRating(trx, rating_id) {
    const ratingsList = await trx
        .select('*')
        .from('ratings')
        .where({ rating_id: rating_id });
    const isRating = ratingsList.length > 0;
    return isRating;
};

async function _getRating(trx, rating_id) {
    const ratingsList = await trx
        .select('rating_id', ...CATEGORIES, 'rating_date', 'clients.client_id', 'client_name')
        .from('ratings')
        .where({ "ratings.rating_id": rating_id })
        .leftJoin('clients', 'ratings.client_id', 'clients.client_id')
    const rating = ratingsList[0];
    return rating;
};

async function getRatingTransaction(rating_id) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {
            const isRating = await getIsRating(trx, rating_id);

            if (!isRating) reject('Rating does not exist');

            const ratingObj = await _getRating(trx, rating_id);

            await trx.commit();

            resolve(ratingObj);
        });
    });
};

function getClientObj(ratingObj) {
    const clientObj = {
        client_id: ratingObj.client_id,
        client_name: ratingObj.client_name,
    };

    delete ratingObj.client_id;
    delete ratingObj.client_name;

    return clientObj;
}

function getDataObj(ratingObj, clientObj) {
    const dataObj = {
        rating: ratingObj,
        clientId: clientObj.client_id,
        clientName: clientObj.client_name,
    };
    return dataObj;
}

async function getRatingDB(rating_id) {
    try {
        const ratingObj = await getRatingTransaction(rating_id);
        const clientObj = getClientObj(ratingObj);
        const dataObj = getDataObj(ratingObj, clientObj);
        return getDataReturn('rating', dataObj);
    } catch (error) {
        return getErrorReturn(error)
    };
};

module.exports = getRatingDB;

// await db.transaction(async (trx) => {
//     const existing_rating = await trx
//         .select('*')
//         .from('ratings')
//         .where({ rating_id: req.params.rating_id })


//     if (existing_rating.length == 0) {
//         return res.status(400).send({
//             ok: false,
//             message: 'rating does not exist.',
//         })
//     }

//     const ratings = await trx
//         .select('rating_id', ...CATEGORIES, 'rating_date', 'client_name')
//         .from('ratings')
//         .where({ "ratings.rating_id": req.params.rating_id })
//         .leftJoin('clients', 'ratings.client_id', 'clients.client_id')

//     await trx.commit();
//     return res.status(200).send({
//         ok: true,
//         data: {
//             ...ratings[0],
//             client_id: existing_rating[0].client_id
//         }
//     });
// });