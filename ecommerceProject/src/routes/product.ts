import express from "express";
const router = express.Router();
const productController = require('../controllers/productController');
import verifyRoles from '../middleware/verifyRoles';

router.route('/')
    .post(verifyRoles('product_add'), productController.createProduct)
    .get(verifyRoles('product_get_all'), productController.getProductList);

router.route('/:prod_id')
    .get(verifyRoles('product_get'), productController.getProductById)
    .put(verifyRoles('product_update'), productController.updateProduct)
    .delete(verifyRoles('product_delete'), productController.deleteProduct);

module.exports = router;