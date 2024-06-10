const { getDataReturn, getErrorReturn } = require('../returners');
const { getIsRating } = require('./getIsRating');
const { db } = require('../dbTransactions');

async function deleteRatingTransaction(rating_id) {
    return new Promise(async (resolve, reject) => {
        try {
            await db.transaction(async (trx) => {

                const isRating = await getIsRating(trx, rating_id);
                if (!isRating) reject('Rating does not exist');

                const deletedRatingList = await trx('ratings')
                    .where({ rating_id: rating_id })
                    .del()
                    .returning('*');

                await trx.commit();

                const deletedRating = deletedRatingList[0]

                resolve(deletedRating)
            });
        } catch (error) {
            reject(error);
        };
    });

}

async function deleteRating(rating_id) {
    try {
        const deletedRating = await deleteRatingTransaction(rating_id)
        return getDataReturn('deletedRating', deletedRating)
    } catch (error) {
        return getErrorReturn(error)
    }
}

module.exports = deleteRating;
