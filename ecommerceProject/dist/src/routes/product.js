"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController = require('../controllers/productController');
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
router.route('/')
    .post((0, verifyRoles_1.default)('product_add'), productController.createProduct)
    .get((0, verifyRoles_1.default)('product_get_all'), productController.getProductList);
router.route('/:prod_id')
    .get((0, verifyRoles_1.default)('product_get'), productController.getProductById)
    .put((0, verifyRoles_1.default)('product_update'), productController.updateProduct)
    .delete((0, verifyRoles_1.default)('product_delete'), productController.deleteProduct);
module.exports = router;
