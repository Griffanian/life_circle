const express = require('express');
require('dotenv').config();

const redirectLogin = require('../backendMethods/redirectLogin.js');
const { sendLoggedIn, sendAccessToken } = require('../backendMethods/responders.js');
const { getUserObj } = require('../backendMethods/helpers.js');
const getToken = require('../backendMethods/getToken.js');

const apiRouter = express.Router();
apiRouter.use(redirectLogin)

apiRouter.get('/', (req, res) => {
    const userName = req.decoded.username
    return sendLoggedIn(res, userName);
});


apiRouter.post('/login', (req, res) => {
    const userObj = getUserObj(req);
    const getTokenRes = getToken(process.env, userObj);
    const token = getTokenRes.token;
    return sendAccessToken(res, token);
});


const clientsRouter = require('./clients.js');
apiRouter.use('/clients', clientsRouter);

const clientRouter = require('./client.js');
apiRouter.use('/client', clientRouter);

const ratingsRouter = require('./ratings.js');
apiRouter.use('/ratings', ratingsRouter);

const ratingRouter = require('./rating.js');
apiRouter.use('/rating', ratingRouter);

module.exports = apiRouter;