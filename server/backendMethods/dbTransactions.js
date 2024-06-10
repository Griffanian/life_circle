const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./server/config.json', 'utf-8'));
const globals = require('../../client/src/globals.js')
require('dotenv').config();

const db_options = config.db_options;
db_options.connection.password = process.env.DB_PASSWORD;
const db = require('knex')(db_options);

function validateClientName(client_name) {
    if (typeof client_name !== 'string') {
        throw new Error('Invalid client name');
    };
    return;
};

function validateID(id) {
    const parsedID = parseFloat(id);
    if (typeof parsedID !== 'number' || isNaN(parsedID)) {
        throw new Error(`The id: ${id} is not a valid number`);
    }
    return;
};

function validateDate(date) {
    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
        throw new Error('Invalid date');
    };
    return;
}

function validateClientParams(client_params) {
    for (const key in client_params) {
        if (key === 'client_name') {
            validateClientName(client_params[key]);
        } else if (key === 'client_id') {
            validateID(client_params[key]);
        } else {
            throw new Error('Invalid client parameter');
        };
    };
    return;
};



module.exports = {
    db,
    config,
    globals,
    validateID,
    validateClientName,
    validateClientParams,
    validateDate
};
