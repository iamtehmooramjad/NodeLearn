const userController = require('../controllers/userController');
const router = require('express').Router();

/** Routes */
router.post('/',userController.createUser);

module.exports = router