const router = require('express').Router();
const userController = require('../controllers/user');
const eventController = require('../controllers/event');
const commentController = require('../controllers/comment')

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
router.get('/event/:id/comments', commentController.getComments);
router.post('/event/:id/addComment', commentController.addComment);
router.patch('/event/:id/comment/:commentId', commentController.editComment);
router.delete('/event/:id/comment/:commentId', commentController.deleteComment);
router.delete('/event/:id/comments', commentController.deleteComments);

module.exports = router;