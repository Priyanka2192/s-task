import express from "express";
const router = express.Router();
const getProductController = require('../controllers/getProductcontroller');

router.route('/').get(getProductController.getProductList);

module.exports = router;