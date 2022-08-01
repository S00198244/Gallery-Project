const router = require('express').Router();
const userController = require('../controllers/user');
const eventController = require('../controllers/event');
const reviewController = require('../controllers/review')
const bookingController = require('../controllers/booking');

// User routes / Auth routes

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.delete('/delete_account', userController.deleteAccount);

// Event routes
router.get('/events', eventController.getEvents);
router.post('/events', eventController.addEvent);
router.patch('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);

// Comment routes
router.get('/event/:id/reviews', reviewController.getReviews);
router.post('/event/:id/add_review', reviewController.addReview);
router.patch('/event/:id/review/:review_id', reviewController.editReview);
router.delete('/event/:id/review/:review_id', reviewController.deleteReview);
router.delete('/event/:id/reviews', reviewController.deleteReviews);

// Booking routes
router.get('/bookings/user/:id', bookingController.getBookingsByUserID);
router.get('/bookings/event/:id', bookingController.getBookingsByEventID);
router.post('/bookings', bookingController.addBooking);

module.exports = router;