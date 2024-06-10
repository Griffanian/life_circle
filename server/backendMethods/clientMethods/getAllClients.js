const { getDataReturn, getErrorReturn } = require('../returners');
const { db } = require('../dbTransactions');

async function retrieveAllClients(trx) {
    const clientList = await trx.select('*').from('clients');
    return clientList;
}

async function getAllClientsTransation() {
    return new Promise(async (resolve, reject) => {
        try {
            db.transaction(async (trx) => {
                const clientsList = await retrieveAllClients(trx);
                resolve(clientsList);
            });
        } catch (error) {
            reject(error);
        }

    })
}

async function getAllClients() {
    try {
        const clientsList = await getAllClientsTransation();
        return getDataReturn('clientsList', { clientsList });
    } catch (error) {
        return getErrorReturn(error);
    }
}

module.exports = getAllClients;