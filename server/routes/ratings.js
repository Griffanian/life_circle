const express = require('express');

const { sendResponse } = require('../backendMethods/responders.js')

const createRating = require('../backendMethods/ratingMethods/createRating.js');
const editRating = require('../backendMethods/ratingMethods/editRating.js');

const { getRatingObj, getNewRatingObj } = require('../backendMethods/helpers.js');


const ratingsRouter = express.Router();

ratingsRouter.post('/', async (req, res) => {
    const newRatingObjRes = getNewRatingObj(req);
    console.log('newRatingObjRes', newRatingObjRes);
    const { success, message, ...newRatingObj } = newRatingObjRes;
    if (newRatingObjRes.success) {
        const newRatingRes = await createRating(newRatingObj);
        return sendResponse(res, newRatingRes);
    };
    return sendResponse(res, newRatingObjRes);
});

ratingsRouter.put('/', async (req, res) => {
    const ratingObjRes = getRatingObj(req);
    const { success, message, ...ratingObj } = ratingObjRes;
    if (ratingObjRes.success) {
        const editedRatingRes = await editRating(ratingObj);
        return sendResponse(res, editedRatingRes);
    }
    return sendResponse(res, ratingObjRes);
});

module.exports = ratingsRouter;