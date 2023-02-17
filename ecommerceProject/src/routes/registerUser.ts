import express from 'express';
const router = express.Router();
const registerUserController = require('../controllers/registerUserController');

router.route('/:role_name').post(registerUserController.registerUser);    

module.exports = router;