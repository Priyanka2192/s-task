import express from 'express';
const router = express.Router();
const orderController = require('../controllers/orderController');
import verifyRoles from '../middleware/verifyRoles';

router.route('/').post(verifyRoles('order_add'), orderController.createOrder);

router.route('/:user_name').get(verifyRoles('order_get_all'), orderController.getAllOrdersByUserName);

router.route('/:order_id').delete(verifyRoles('order_delete'), orderController.deleteOrder);

module.exports = router;