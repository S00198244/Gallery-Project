const router = require('express').Router();
const userController = require('../controllers/user');
const eventController = require('../controllers/event');
const reviewController = require('../controllers/review')

// User routes / Auth routes

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.delete('/deleteAccount', userController.deleteAccount);

// Event routes
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);
router.patch('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);

// Comment routes
router.get('/event/:id/comments', reviewController.getReviews);
router.post('/event/:id/addComment', reviewController.addReview);
router.patch('/event/:id/comment/:commentId', reviewController.editReview);
router.delete('/event/:id/comment/:commentId', reviewController.deleteReview);
router.delete('/event/:id/comments', reviewController.deleteReviews);

module.exports = router;