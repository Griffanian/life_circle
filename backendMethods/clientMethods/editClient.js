const { getDataReturn, getErrorReturn } = require('../returners')
const { db, validateClientParams } = require('../dbTransactions')
const { getIsClient } = require('./getIsClient')

async function updateClient(trx, client_params) {
    const { client_id, client_name } = client_params;

    const newClientlist = await trx('clients')
        .where({ client_id })
        .update({ client_name })
        .returning('*');
    const newClient = newClientlist[0];
    return newClient;
}

async function editClientTransaction(client_params) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {
            const client_id = client_params.client_id

            const isClient = await getIsClient(trx, client_id);
            if (!isClient) reject('Client does not exist');

            const editedClient = updateClient(trx, client_params);
            resolve(editedClient);
        });
    })
}

async function editClient(client_params) {
    try {
        validateClientParams(client_params);

        const editedClient = await editClientTransaction(client_params);

        return getDataReturn('editedClient', {
            editedClient
        });
    } catch (error) {
        return getErrorReturn(error);
    }
}

module.exports = editClient;