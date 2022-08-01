const { Review, validate } = require('../models/review');

class reviewController{
    // Get reviews

    async getReviews(req, res)
    {
        console.log("In getReviews()");

        const eventID = req.params.id;

        try {
            const reviews = await Review.find({ eventID: eventID })

            if (reviews) {
                res.status(200).json(reviews)
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (error) {
            res.status(500).json('db error')
        }
    }

    // Add review

    async addReview(req, res)
    {
        console.log("In addReview()");

        const newReview = { 
            eventID: req.params.id,
            review: req.body.review,
            rating: req.body.rating,
            userID: req.body.userID,
            userName: req.body.userName
        }

        console.log(newReview);

        let result = validate(newReview);

        if (result.error) {
            res.status(400).json(result.error);
            return;
        }

        try {
            let review = new Review(newReview);

            review = await review.save();

            res.status(200).json(review);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Edit review

    async editReview(req, res)
    {
        console.log("In editReview()");

        const id = { _id: req.params.reviewID };

        const data = { text: req.body.text };

        console.log(data);

        try {
            const review = await Review.findByIdAndUpdate(id, {$set: data}, { new: true })

            if (review) {
                res.status(200).json(review);
            }
            else {
                res.status(404).json(`Review with id of ${req.params.id} was not found`)
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete review

    async deleteReview(req, res)
    {
        console.log("In deleteReview()");

        try {
            const review = await Review.findByIdAndDelete(req.params.review_id);

            if (review) {
                res.json(review._id)
            }
            else {
                res.status(404).json(`Event with id of ${req.params.review_id} was not found`);
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete reviews

    async deleteReviews(req, res)
    {
        console.log("In deleteReviews()");

        try {

        }
        catch (error) {

        }
    }
}
module.exports = new reviewController();