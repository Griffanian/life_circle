const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const getAllRatings = require('../backendMethods/ratingMethods/getAllRatings.js');
const deleteClient = require('../backendMethods/clientMethods/deleteClient.js');
const { getClientID } = require('../backendMethods/helpers.js');

const clientRouter = express.Router();

clientRouter.get('/:client_id', async (req, res) => {
    const clientIdRes = getClientID(req);
    if (clientIdRes.success) {
        const ratings = await getAllRatings(clientIdRes.client_id);
        return sendResponse(res, ratings);
    } else {
        return sendResponse(res, clientIdRes);
    };
});


clientRouter.delete('/:client_id', async function (req, res) {
    const clientIDRes = getClientID(req);

    if (clientIDRes.success) {
        const deleteClientRes = await deleteClient(clientIDRes.client_id);
        return sendResponse(res, deleteClientRes);
    };

    return sendResponse(res, clientIDRes);
});

module.exports = clientRouter;