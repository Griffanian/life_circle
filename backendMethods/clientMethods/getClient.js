const { getClientList } = require("./getIsClient");

async function getClient(trx, client_param) {

    const clientsList = await getClientList(trx, client_param);
    if (clientsList.length !== 1) {
        throw new Error('Error getting client')
    } else {
        const client = clientsList[0]
        return client
    }
}

module.exports = { getClient }