async function getListFromClientId(trx, client_id) {
    const clientsList = await trx
        .select('client_id', 'client_name')
        .from('clients')
        .where({ client_id });
    return clientsList;
}

async function getListFromClientName(trx, client_name) {
    const clientsList = await trx
        .select('client_id', 'client_name')
        .from('clients')
        .where({ client_name });
    return clientsList;
}

function isNumeric(num) {
    return !isNaN(num)
}

async function getClientList(trx, client_param) {
    let clientsList;
    if (isNumeric(client_param)) {
        const client_id = client_param;
        clientsList = await getListFromClientId(trx, client_id);
    } else {
        const client_name = client_param;
        clientsList = await getListFromClientName(trx, client_name);
    }
    return clientsList;
}

async function getIsClient(trx, client_param) {
    const clientsList = await getClientList(trx, client_param);
    const isClient = clientsList.length > 0;
    return isClient;
}

module.exports = { getIsClient, getClientList }

