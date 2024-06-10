const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const getAllClients = require('../backendMethods/clientMethods/getAllClients.js');
const createClient = require('../backendMethods/clientMethods/createClient.js');
const editClient = require('../backendMethods/clientMethods/editClient.js');

const { getClientParams, getClientName } = require('../backendMethods/helpers.js');


const clientsRouter = express.Router();

clientsRouter.get('/', async (req, res) => {
    const getAllClientsRes = await getAllClients();
    return sendResponse(res, getAllClientsRes);
});

clientsRouter.post('/', async (req, res) => {
    const clientNameRes = getClientName(req);
    if (clientIDRes.success) {
        const createClientRes = await createClient(clientNameRes.client_name);
        return sendResponse(res, createClientRes);
    };
    return sendResponse(res, clientNameRes);
});

clientsRouter.put('/', async (req, res) => {
    const clientParamsRes = getClientParams(req);
    if (clientParamsRes.success) {
        const editClientRes = await editClient(clientParamsRes.client_params);
        return sendResponse(res, editClientRes);
    };
    return sendResponse(res, clientParamsRes);
});

module.exports = clientsRouter;