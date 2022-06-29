const { Comment, validate } = require('../models/comment');

class commentController{
    // Get comments

    async getComments(req, res)
    {
        console.log("In getComments()");

        try {
            const comments = await Comment.find()

            if (comments) {
                res.json(comments)
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (error) {
            res.status(500).json('db error')
        }
    }

    // Add comment

    async addComment(req, res)
    {
        console.log("In addComment()");

        const newComment = { 
            eventID: req.params.id,
            text: req.body.comment,
            userID: req.body.userID,
            userName: req.body.userName
        }

        console.log(newComment);

        let result = validate(newComment);

        if (result.error) {
            res.status(400).json(result.error);
            return;
        }

        try {
            let comment = new Comment(newComment);

            comment = await comment.save();

            res.status(200).json(comment);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Edit comment

    async editComment(req, res)
    {
        console.log("In editComment()");

        const id = { _id: req.params.commentId };

        const data = { text: req.body.text };

        console.log(data);

        try {
            const comment = await Comment.findByIdAndUpdate(id, {$set: data}, { new: true })

            if (comment) {
                res.status(200).json(comment);
            }
            else {
                res.status(404).json(`Comment with id of ${req.params.id} was not found`)
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete comment

    async deleteComment(req, res)
    {
        console.log("In deleteComment()");

        try {
            const comment = await Comment.findByIdAndDelete(req.params.commentId);

            if (comment) {
                res.json(comment._id)
            }
            else {
                res.status(404).json(`Event with id of ${req.params.commentId} was not found`);
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete comments

    async deleteComments(req, res)
    {
        console.log("In deleteComments()");

        try {

        }
        catch (error) {

        }
    }
}
module.exports = new commentController();