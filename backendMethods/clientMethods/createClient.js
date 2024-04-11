const { db, validateClientName } = require('../dbTransactions');
const { getIsClient } = require('../clientMethods/getIsClient');
const { getDataReturn, getErrorReturn } = require('../returners');


async function insertClient(trx, client_name) {
    const newClientlist = await trx('clients').insert({
        client_name
    }).returning('*');
    const newClient = newClientlist[0]
    return newClient;
}

async function createClientTransaction(client_name) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async (trx) => {

            const isClient = await getIsClient(trx, client_name);
            if (isClient) reject('Client already exists');

            const insertedClient = await insertClient(trx, client_name);
            resolve(insertedClient);
        })
    })
}

async function createClient(client_name) {
    try {
        validateClientName(client_name);
        const createdClient = await createClientTransaction(client_name);
        return getDataReturn('newClient', {
            'newClient': createdClient
        });
    } catch (error) {
        return getErrorReturn(error);
    }
}

module.exports = createClient;