import { getErrorReturn, getDataReturn } from "./returners";

function getClientURL(client_id) {
    return new URL(`api/client/${client_id}`, global.config.BASE_URL)
};

function getClientsURL() {
    return new URL('api/clients', global.config.BASE_URL)
}

async function _createClient(bodyObj) {
    const client_url = getClientsURL()

    return fetch(client_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj),
        credentials: "include",
    })
};

async function createClient(bodyObj) {
    try {
        const createdClient = await _createClient(bodyObj);
        const createdClientJson = await createdClient.json();
        return getDataReturn(createdClientJson);
    } catch (error) {
        return getErrorReturn(error);
    };
}

async function getClientList() {
    try {
        const client_url = getClientsURL()

        const client_list = await fetch(client_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data && data.client_list) {
                    return data.client_list;
                } else {
                    throw new Error('Client list not available');
                }
            });

        return client_list;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throwing the error for the calling code to handle
    }
}

async function deleteClient(client_id) {

    const clientURL = getClientURL(client_id)

    return fetch(clientURL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                return { message: 'success' }
            } else {
                return { message: 'failure' }
            }
        })
        .catch((error) => {
            return { message: 'failure' }
        })
}

async function getClient(client_id) {

    const clientURL = getClientURL(client_id)
    return fetch(clientURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            console.log('data', data)
            if (data.ok) {
                return (data)
            } else {

            }

        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function editClient(body) {
    const clientURL = getClientsURL()
    return fetch(clientURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",

    })
        .then(res => {
            console.log('res', res)
            return res.json()
        })
        .then(data => {
            if (data.ok) {
                return { message: 'success' }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

export { createClient, getClient, getClientList, editClient, deleteClient }