const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
require('dotenv').config();

const db_options = config.db_options;
db_options.connection.password = process.env.DB_PASSWORD;
const db = require('knex')(db_options);

function validateClientName(client_name) {
    if (!(client_name) || typeof client_name !== 'string') {
        throw new Error('Invalid client name');
    }
    return;
}

function validateClientID(client_id) {
    if (!(client_id) || typeof client_id !== 'number') {
        throw new Error('Invalid client ID');
    }
    return;
}

function validateClientParams(client_params) {
    for (const key in client_params) {
        if (key === 'client_name') {
            validateClientName(client_params[key]);
        } else if (key === 'client_id') {
            validateClientID(client_params[key]);
        } else {
            throw new Error('Invalid client parameter');
        }
    }
}


module.exports = { db, validateClientName, validateClientParams };
