const Joi = require('joi');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    eventID: String,
    text: String,
    rating: Number,
    userID: String,
    userName: String
})

function validateReview(event) {
    const schema = Joi.object({
        eventID:  Joi.string(),
        text: Joi.string(),
        rating: Joi.number(),
        userID: Joi.string(),
        userName: Joi.string()
    })
    return schema.validate(event);
}

const Review = mongoose.model('reviews', reviewSchema);

exports.Review = Review;
exports.validate = validateReview;