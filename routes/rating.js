const getRatingDB = require('../backendMethods/ratingMethods/getRatingDb.js');
const deleteRating = require('../backendMethods/ratingMethods/deleteRating.js');
const { sendResponse } = require('../backendMethods/responders.js');

const express = require('express');

const ratingRouter = express.Router();

ratingRouter.get('/:rating_id', async (req, res) => {
    const rating_id = req.params.rating_id;
    const getRatingRes = await getRatingDB(rating_id);
    return sendResponse(res, getRatingRes);
});

ratingRouter.delete('/:rating_id', async function (req, res) {
    const rating_id = req.params.rating_id;
    const deleteRatingRes = await deleteRating(rating_id);
    return sendResponse(res, deleteRatingRes);
});

module.exports = ratingRouter;