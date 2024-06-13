const { getDataReturn, getErrorReturn } = require('../returners');
const { getIsRating } = require('./getIsRating');
const { db } = require('../dbTransactions');

async function createRatingTransaction(ratingObj) {
    return new Promise(async (resolve, reject) => {
        try {
            await db.transaction(async (trx) => {

                const rating_date = ratingObj.rating_date;
                const isRating = await getIsRating(trx, rating_date);
                if (isRating) reject('Client already has rating for this date');

                const ratingsList = await trx('ratings')
                    .insert(ratingObj)
                    .returning('*');

                await trx.commit();

                const newRating = ratingsList[0];

                resolve(newRating);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        };
    });
}

async function createRating(ratingsObj) {
    try {
        const newRating = await createRatingTransaction(ratingsObj);
        return getDataReturn('newRating', newRating);
    } catch (error) {
        return getErrorReturn(error);
    };
};

module.exports = createRating;