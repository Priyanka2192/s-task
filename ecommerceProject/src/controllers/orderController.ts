import sequelize from '../utils/dbConnection';
const { QueryTypes } = require('sequelize');
import { Request, Response } from 'express';
import Product from '../model/Product';
import Order from '../model/Order';

//create new order -- Customer,Support,Admin
const createOrder = async (req: Request, res: Response) => {
    try {
        console.log('In orderController.createOrder');
        if (!req.body.prod_id) {
            return res.status(400).json({ 'message': "Product id is required." });
        } else {
            const checkProductAvailable = await Product.findByPk(req.body.prod_id);
            if (!checkProductAvailable)
                return res.status(409).json({ 'message': `Product with id: ${req.body.prod_id} does not exists.` }); //conflict

            await Order.create({
                prod_id: req.body.prod_id,
                user_id: req.body.user_id
            });
            return res.status(201).json({ 'message': 'New order created successfully!!' });
        }
    } catch (err: any) {
        console.error('Error in orderController.createOrder' + err.message)
    }
}

//get all order details by user name -- Customer,Support,Admin
const getAllOrdersByUserName = async (req: Request, res: Response) => {
    try {
        console.log("In orderController.getAllOrdersByUserName");
        const userName = req.params.user_name;
        
        const order = await sequelize.query(`SELECT o.order_id,u.user_fullname,u.user_email,p.prod_name,p.prod_description,p.prod_price  FROM orders o join products p join users u where o.user_id = u.id and o.prod_id = p.prod_id and u.user_fullname like "%${userName}%" order by o.order_id;`, { type: QueryTypes.SELECT });
        
        if (order.length) {
            return res.status(200).json(order);
        } else {
            return res.status(200).json({ 'message': `No data available for orders with user name ${userName}` });
        }
    } catch (err: any) {
        console.error('Error in orderController.getAllOrdersByUserName : ' + err.message);
    }
}

//delete order -- Customer,Support,Admin
const deleteOrder = async (req: Request, res: Response) => {
    try {
        console.log("In orderController.deleteOrder");
        const orderId = parseInt(req.params.order_id);
        const data = await Order.findByPk(orderId);
        if (data !== null) {
            await Order.destroy({ where: { order_id: orderId } });
            return res.status(200).json({ 'message': `Row deleted successfully for order with id ${orderId}` });
        } else {
            return res.status(200).json({ 'message': `No data available for order with id ${orderId}` });
        }
    } catch (err: any) {
        console.error('Error in orderController.deleteOrder : ' + err.message);
    }
}

module.exports = { createOrder, deleteOrder, getAllOrdersByUserName }