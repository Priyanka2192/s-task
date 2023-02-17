"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../model/Order"));
const Product_1 = __importDefault(require("../model/Product"));
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
const Role_1 = __importDefault(require("../model/Role"));
const { QueryTypes } = require('sequelize');
//create new order -- Customer,Support,Admin
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In orderController.createOrder');
        if (!req.body.prod_id) {
            return res.status(400).json({ 'message': "Product id is required." });
        }
        else {
            const checkProductAvailable = yield Product_1.default.findByPk(req.body.prod_id);
            if (!checkProductAvailable)
                return res.status(409).json({ 'message': `Product with id: ${req.body.prod_id} does not exists.` }); //conflict
            yield Order_1.default.create({
                prod_id: req.body.prod_id,
                user_id: req.body.user_id
            });
            return res.status(201).json({ 'message': 'New order created successfully!!' });
        }
    }
    catch (err) {
        console.error('Error in orderController.createOrder' + err.message);
    }
});
//get all orders by users(customers) -- Customer,Support,Admin
const getAllOrdersByUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In orderController.getAllOrdersByUserRole");
        const roleName = req.params.role_name;
        const roleData = yield Role_1.default.findOne({ where: { role_name: `${roleName}` } });
        const order = yield dbConnection_1.default.query(`SELECT o.order_id,u.user_fullname,u.user_email,p.prod_name,p.prod_description,p.prod_price  FROM orders o join products p join users u where o.user_id = u.id and o.prod_id = p.prod_id and u.role_id = ${roleData === null || roleData === void 0 ? void 0 : roleData.id};`, { type: QueryTypes.SELECT });
        if (order !== null) {
            return res.status(200).json(order);
        }
        else {
            return res.status(200).json({ 'message': `No data available for orders with role as customer` });
        }
    }
    catch (err) {
        console.error('Error in orderController.getAllOrdersByUserRole : ' + err.message);
    }
});
//get all order details by user name -- Customer,Support,Admin
const getAllOrdersByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In orderController.getAllOrdersByUserName");
        const userName = req.params.user_name;
        const order = yield dbConnection_1.default.query(`SELECT o.order_id,u.user_fullname,u.user_email,p.prod_name,p.prod_description,p.prod_price  FROM orders o join products p join users u where o.user_id = u.id and o.prod_id = p.prod_id and u.user_fullname like "%${userName}%";`, { type: QueryTypes.SELECT });
        if (order !== null) {
            return res.status(200).json(order);
        }
        else {
            return res.status(200).json({ 'message': `No data available for orders with user name ${userName}` });
        }
    }
    catch (err) {
        console.error('Error in orderController.getAllOrdersByUserName : ' + err.message);
    }
});
//get order details by id -- Customer,Support,Admin
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In orderController.getOrderById");
        const orderId = parseInt(req.params.order_id);
        const data = yield Order_1.default.findByPk(orderId);
        if (data !== null) {
            const order = yield dbConnection_1.default.query(`SELECT o.order_id,u.user_fullname,u.user_email,p.prod_name,p.prod_description,p.prod_price  FROM orders o join products p join users u where o.user_id = u.id and o.prod_id = p.prod_id and o.order_id = ${orderId};`, { type: QueryTypes.SELECT });
            return res.status(200).json(order);
        }
        else {
            return res.status(200).json({ 'message': `No data available for order with id ${orderId}` });
        }
    }
    catch (err) {
        console.error('Error in orderController.getOrderById : ' + err.message);
    }
});
//delete order -- Customer,Support,Admin
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In orderController.deleteOrder");
        const orderId = parseInt(req.params.order_id);
        const data = yield Order_1.default.findByPk(orderId);
        if (data !== null) {
            yield Order_1.default.destroy({ where: { order_id: orderId } });
            return res.status(200).json({ 'message': `Row deleted successfully for order with id ${orderId}` });
        }
        else {
            return res.status(200).json({ 'message': `No data available for order with id ${orderId}` });
        }
    }
    catch (err) {
        console.error('Error in orderController.deleteOrder : ' + err.message);
    }
});
module.exports = { createOrder, deleteOrder, getOrderById, getAllOrdersByUserRole, getAllOrdersByUserName };
