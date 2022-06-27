const router = require('express').Router();
const userController = require('../controllers/user');

// User routes / Auth routes

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router;