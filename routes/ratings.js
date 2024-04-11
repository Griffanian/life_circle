const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const getAllRatings = require('../backendMethods/ratingMethods/getAllRatings.js');
const createRating = require('../backendMethods/ratingMethods/createRating.js');
const editRating = require('../backendMethods/ratingMethods/editRating.js');

const { getRatingObj } = require('../backendMethods/helpers.js');
const { getNewRatingObj } = require('../backendMethods/helpers.js');


const ratingsRouter = express.Router();

ratingsRouter.get('/:client_id', async (req, res) => {
    const client_id = req.params.client_id;
    const getRatingsRes = await getAllRatings(client_id);
    return sendResponse(res, getRatingsRes);
});

ratingsRouter.post('/', async (req, res) => {
    const newRatingObj = getNewRatingObj(req);
    const newRatingRes = await createRating(newRatingObj);
    return sendResponse(res, newRatingRes);
});

ratingsRouter.put('/', async (req, res) => {
    const ratingObj = getRatingObj(req);
    const editedRatingRes = await editRating(ratingObj);
    return sendResponse(res, editedRatingRes);
});

module.exports = ratingsRouter;