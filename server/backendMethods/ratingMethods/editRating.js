const { db } = require('../dbTransactions');
const { getIsRating } = require("./getIsRating");
const { getDataReturn, getErrorReturn } = require("../../returners");

async function insertRating(trx, ratingObj) {
    const ratingsList = await trx('ratings')
        .where({ rating_id: ratingObj.rating_id })
        .update(ratingObj)
        .returning('*');

    return ratingsList;
}

async function editRatingTransaction(ratingObj) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {

            const rating_id = ratingObj.rating_id;

            const isRating = await getIsRating(trx, rating_id);
            if (!isRating) reject('There is not a rating with that id.');

            const ratingsList = await insertRating(trx, ratingObj);
            await trx.commit();

            const newRating = ratingsList[0];
            resolve(newRating);
        })
    })
}


async function editRating(ratingObj) {
    try {
        const newRating = await editRatingTransaction(ratingObj);
        return getDataReturn('newRating', newRating);
    } catch (error) {
        console.log('error', error);
        return getErrorReturn('error', error);
    }
}

module.exports = editRating;