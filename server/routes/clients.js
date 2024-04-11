const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const getAllClients = require('../backendMethods/clientMethods/getAllClients.js');
const createClient = require('../backendMethods/clientMethods/createClient.js');
const editClient = require('../backendMethods/clientMethods/editClient.js');

const { getClientParams } = require('../backendMethods/helpers.js');


const clientsRouter = express.Router();

clientsRouter.get('/', async (req, res) => {
    const getAllClientsRes = await getAllClients();
    return sendResponse(res, getAllClientsRes);
});

clientsRouter.post('/', async (req, res) => {
    const client_name = req.body.client_name;
    const createClientRes = await createClient(client_name);
    return sendResponse(res, createClientRes);
})

clientsRouter.put('/', async (req, res) => {
    const client_params = getClientParams(req);
    const editClientRes = await editClient(client_params);
    return sendResponse(res, editClientRes);
});

module.exports = clientsRouter;