"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const orderController = require('../controllers/orderController');
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
router.route('/').post((0, verifyRoles_1.default)('order_add'), orderController.createOrder);
router.route('/:role_name').get((0, verifyRoles_1.default)('order_get_all'), orderController.getAllOrdersByUserRole);
router.route('/:user_name').get((0, verifyRoles_1.default)('order_get_all'), orderController.getAllOrdersByUserName);
router.route('/:order_id')
    .get((0, verifyRoles_1.default)('order_get'), orderController.getOrderById)
    .delete((0, verifyRoles_1.default)('order_delete'), orderController.deleteOrder);
module.exports = router;
