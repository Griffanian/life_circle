function getFormattedDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-GB', options);

    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('en-GB', { month: 'long' });

    const daySuffix = getDaySuffix(dayNumber);

    return `${dayNumber}${daySuffix} ${monthName} ${day.slice(-4)}`;
}

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

async function getIsLoggedIn() {

    const baseUrl = new URL(`/`, process.env.REACT_APP_BACKEND_URL)

    return fetch(baseUrl, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",

    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                return {
                    loggedIn: true,
                    username: data.username,
                }
            } else {
                return {
                    loggedIn: false,
                    message: data.message
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log("server is down!!")
        })
}

async function login(username, password) {

    const loginUrl = new URL('/login', process.env.REACT_APP_BACKEND_URL)

    const bodyObj = {
        username,
        password
    }

    return fetch(loginUrl, {
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

export { getFormattedDate, getIsLoggedIn, login }