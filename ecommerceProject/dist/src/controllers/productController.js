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
const Product_1 = __importDefault(require("../model/Product"));
//creates a product list -- only admin
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In productController.createProduct');
        if (!req.body.prod_name || !req.body.prod_description || !req.body.prod_price) {
            return res.status(400).json({ 'message': "Product name ,price and description are required." });
        }
        else {
            const checkProductAvailable = yield Product_1.default.findOne({ where: { prod_name: req.body.prod_name } });
            if (checkProductAvailable)
                return res.status(409).json({ 'message': `Product with name: ${req.body.prod_name} already exists.` }); //conflict
            yield Product_1.default.create({
                prod_name: req.body.prod_name,
                prod_description: req.body.prod_description,
                prod_price: req.body.prod_price
            });
            return res.status(201).json({ 'message': 'New product created successfully!!' });
        }
    }
    catch (err) {
        console.error('Error in productController.createProduct : ' + err.message);
    }
});
//view product list -- customer,support,admin
const getProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In productController.getProductList");
        const data = yield Product_1.default.findAll({
            attributes: ['prod_id', 'prod_name', 'prod_description', 'prod_price']
        });
        res.status(200).json(data);
    }
    catch (err) {
        console.error('Error in productController.getProductList : ' + err.message);
    }
});
//get single product details from db -- customer,support,admin
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In productController.getProductById");
        const prodId = parseInt(req.params.prod_id);
        const data = yield Product_1.default.findByPk(prodId);
        if (data !== null)
            return res.status(200).json(data);
        return res.status(200).json({ 'message': `No data available for product with id ${prodId}` });
    }
    catch (err) {
        console.error('Error in productController.getProductById : ' + err.message);
    }
});
//update product list -- admin
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In productController.updateProduct");
        if (!Object.keys(req.body).length)
            res.status(400).json({ 'message': 'No data available for update.' });
        const prodId = parseInt(req.params.prod_id);
        let prodName, prodDescription, prodPrice;
        if (req.body.prod_name)
            prodName = req.body.prod_name;
        if (req.body.prod_description)
            prodDescription = req.body.prod_description;
        if (req.body.prod_price)
            prodPrice = req.body.prod_price;
        const data = yield Product_1.default.findByPk(prodId);
        if (data !== null) {
            yield Product_1.default.update({
                prod_name: prodName,
                prod_description: prodDescription,
                prod_price: req.body.prod_price
            }, {
                where: { prod_id: prodId }
            });
            return res.status(200).json({ 'message': `Row updated successfully with product id ${prodId}` });
        }
        else {
            return res.status(200).json({ 'message': `No data available for product id ${prodId}` });
        }
    }
    catch (err) {
        console.error('Error in productController.updateProduct : ' + err.message);
    }
});
//delete product -- admin
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In productController.deleteProduct");
        const productId = parseInt(req.params.prod_id);
        const data = yield Product_1.default.findByPk(productId);
        if (data !== null) {
            yield Product_1.default.destroy({ where: { prod_id: productId } });
            return res.status(200).json({ 'message': `Row deleted successfully for product with id ${productId}` });
        }
        else {
            return res.status(200).json({ 'message': `No data available for product with id ${productId}` });
        }
    }
    catch (err) {
        console.error('Error in productController.deleteProduct : ' + err.message);
    }
});
module.exports = { getProductList, createProduct, updateProduct, deleteProduct, getProductById };
