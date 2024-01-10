async function createRating(bodyObj) {
    const ratings_url = new URL('api/ratings/', process.env.REACT_APP_BASE_URL)
    return fetch(ratings_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyObj),
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => data)
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function getRating(rating_id) {
    const rating_url = new URL('api/rating/' + rating_id, process.env.REACT_APP_BASE_URL)

    return fetch(rating_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                return data.data;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function getRatinglist(client_id) {
    const rating_url = new URL(`api/ratings/${client_id}`, process.env.REACT_APP_BASE_URL)
    return fetch(rating_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                return data;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function editRating(bodyObj) {

    const ratings_url = new URL('api/ratings/', process.env.REACT_APP_BASE_URL)

    return fetch(ratings_url, {
        method: "PUT",
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

async function deleteRating(rating_id) {
    const rating_url = new URL(`api/rating/${rating_id}`, process.env.REACT_APP_BASE_URL)
    return fetch(rating_url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
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

export { createRating, getRating, getRatinglist, editRating, deleteRating }