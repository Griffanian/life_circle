const { db } = require('../dbTransactions');
const { getErrorReturn, getDataReturn } = require("../../returners");
const { getClient } = require("../clientMethods/getClient");

async function getRatingsList(trx, client_id) {
    const ratingsList = await trx
        .select('*')
        .from('ratings')
        .where({ client_id });
    return ratingsList;
};

async function getAllRatingsTransation(client_id) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {
            const clientObj = await getClient(trx, client_id);
            const ratingsList = await getRatingsList(trx, client_id);
            await trx.commit();

            if (Object.keys(clientObj).length === 0) reject('Client does not exist')

            resolve({
                clientObj,
                ratingsList
            });
        });
    });
};

function getDataObj(ratingsList, clientObj) {
    return {
        ratingsList,
        clientId: clientObj.client_id,
        clientName: clientObj.client_name,
    };
};

async function getAllRatings(client_id) {
    try {
        const { clientObj, ratingsList } = await getAllRatingsTransation(client_id);
        const dataObj = getDataObj(ratingsList, clientObj);
        return getDataReturn('ratingsList', dataObj);
    } catch (error) {
        return getErrorReturn(error);
    };
};

module.exports = getAllRatings;