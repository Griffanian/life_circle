const { db } = require('../dbTransactions')
const { getDataReturn, getErrorReturn } = require('../returners')
const { getIsClient } = require('./getIsClient')

async function deleteRatingsDB(trx, client_id) {
    await trx
        .from('ratings')
        .where({ client_id })
        .del()
        .returning('*')
    return;
}

async function deleteClientDB(trx, client_id) {
    deleteRatingsDB(trx, client_id);
    const clientList = await trx
        .from('clients')
        .where({ client_id })
        .del()
        .returning('*')
    const client = clientList[0];
    return client;
}

async function deleteClientTransaction(client_id) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {

            const isClient = await getIsClient(trx, client_id);
            if (!isClient) reject('Client does not exist');

            const client = await deleteClientDB(trx, client_id);
            await trx.commit();

            resolve(client);
        });
    });
};

async function deleteClient(client_id) {
    try {
        const deletedClient = await deleteClientTransaction(client_id);
        return getDataReturn('deletedClient', {
            deletedClient
        });
    } catch (error) {
        return getErrorReturn(error);
    };
}
module.exports = deleteClient;