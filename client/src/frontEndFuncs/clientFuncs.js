function getClientURL(client_id) {
    if (client_id) {
        return new URL(`api/client/${client_id}`, process.env.REACT_APP_BASE_URL)
    } else {
        return new URL("api/clients/", process.env.REACT_APP_BASE_URL)
    }

}

async function createClient(bodyObj) {

    const client_url = getClientURL()

    return fetch(client_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj),
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                return data
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function getClientList() {
    try {
        const client_url = getClientURL()

        const client_list = await fetch(client_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
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
            if (data.ok) {
                return (data)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function editClient(body) {
    const clientURL = getClientURL()

    return fetch(clientURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",

    })
        .then(res => res.json())
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