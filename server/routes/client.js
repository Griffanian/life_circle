const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const getAllRatings = require('../backendMethods/ratingMethods/getAllRatings.js');
const deleteClient = require('../backendMethods/clientMethods/deleteClient.js');

const clientRouter = express.Router();

clientRouter.get('/:client_id', async (req, res) => {
    const client_id = req.params.client_id;
    const getRatingsRes = await getAllRatings(client_id);
    return sendResponse(res, getRatingsRes);
});

clientRouter.delete('/:client_id', async function (req, res) {
    const client_id = req.params.client_id;
    const deleteClientRes = await deleteClient(client_id);
    return sendResponse(res, deleteClientRes);
});

module.exports = clientRouter;