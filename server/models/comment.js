const Joi = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    eventID: String,
    text: String,
    userID: String,
    userName: String
})

function validateComment(event) {
    const schema = Joi.object({
        eventID:  Joi.string(),
        text: Joi.string(),
        userID: Joi.string(),
        userName: Joi.string()
    })
    return schema.validate(event);
}

const Comment = mongoose.model('comments', commentSchema);

exports.Comment = Comment;
exports.validate = validateComment;