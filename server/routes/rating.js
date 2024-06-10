const express = require('express');

const getRatingDB = require('../backendMethods/ratingMethods/getRatingDb.js');
const deleteRating = require('../backendMethods/ratingMethods/deleteRating.js');
const { sendResponse } = require('../backendMethods/responders.js');
const { getRatingID } = require('../backendMethods/helpers.js');

const ratingRouter = express.Router();

ratingRouter.get('/:rating_id', async (req, res) => {
    const ratingIDRes = getRatingID(req);
    if (ratingIDRes.success) {
        const getRatingRes = await getRatingDB(ratingIDRes.rating_id);
        return sendResponse(res, getRatingRes);
    };
    return sendResponse(res, ratingIDRes);
});

ratingRouter.delete('/:rating_id', async function (req, res) {
    const ratingIDRes = getRatingID(req);
    if (ratingIDRes.success) {
        const deleteRatingRes = await deleteRating(ratingIDRes.rating_id);
        return sendResponse(res, deleteRatingRes);
    };
    return sendResponse(res, ratingIDRes);
});

module.exports = ratingRouter;