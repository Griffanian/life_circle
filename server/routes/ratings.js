const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const createRating = require('../backendMethods/ratingMethods/createRating.js');
const editRating = require('../backendMethods/ratingMethods/editRating.js');

const { getRatingObj, getNewRatingObj } = require('../backendMethods/helpers.js');


const ratingsRouter = express.Router();

ratingsRouter.post('/', async (req, res) => {
    const newRatingObjRes = getNewRatingObj(req);
    if (newRatingObjRes.success) {
        const newRatingRes = await createRating(newRatingObjRes.rating_id);
        return sendResponse(res, newRatingRes);
    };
    return sendResponse(res, newRatingObjRes);
});

ratingsRouter.put('/', async (req, res) => {
    const ratingObjRes = getRatingObj(req); ß
    if (ratingObjRes.success) {
        const editedRatingRes = await editRating(ratingObjRes.rating_id);
        return sendResponse(res, editedRatingRes);
    }
    return sendResponse(res, ratingObjRes);
});

module.exports = ratingsRouter;