import express from "express";
const router = express.Router();
const addProductController = require('../controllers/addProductController');

router.route('/').post(addProductController.createProduct)

module.exports = router;