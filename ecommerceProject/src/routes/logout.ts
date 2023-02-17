import express from 'express';
const router = express.Router();
const logoutController = require('../controllers/logoutController');

router.route('/').get(logoutController.handleLogout);

module.exports = router;