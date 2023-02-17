import Product from '../model/Product';
import { Request, Response } from 'express';
import Order from '../model/Order';

//creates a product list -- only admin
const createProduct = async (req: Request, res: Response) => {
    try {
        console.log('In productController.createProduct');
        if (!req.body.prod_name || !req.body.prod_description || !req.body.prod_price) {
            return res.status(400).json({ 'message': "Product name ,price and description are required." });
        } else {
            const checkProductAvailable = await Product.findOne({ where: { prod_name: req.body.prod_name } });
            if (checkProductAvailable)
                return res.status(409).json({ 'message': `Product with name: ${req.body.prod_name} already exists.` }); //conflict

            await Product.create({
                prod_name: req.body.prod_name,
                prod_description: req.body.prod_description,
                prod_price: req.body.prod_price
            });
            return res.status(201).json({ 'message': 'New product created successfully!!' });
        }
    } catch (err: any) {
        console.error('Error in productController.createProduct : ' + err.message);
    }
}

//view product list -- customer,support,admin
const getProductList = async (req: Request, res: Response) => {
    try {
        console.log("In productController.getProductList");
        const data: Product[] | null = await Product.findAll({
            attributes: ['prod_id', 'prod_name', 'prod_description', 'prod_price']
        });
        res.status(200).json(data);
    } catch (err: any) {
        console.error('Error in productController.getProductList : ' + err.message);
    }
}

//get single product details from db -- customer,support,admin
const getProductById = async (req: Request, res: Response) => {
    try {
        console.log("In productController.getProductById");
        const prodId = parseInt(req.params.prod_id);
        const data: Product | null = await Product.findByPk(prodId);
        if (data !== null)
            return res.status(200).json(data);
        return res.status(200).json({ 'message': `No data available for product with id ${prodId}` });
    } catch (err: any) {
        console.error('Error in productController.getProductById : ' + err.message);
    }
}

//update product list -- admin
const updateProduct = async (req: Request, res: Response) => {
    try {
        console.log("In productController.updateProduct");
        if (Object.keys(req.body).length <= 3) {
            res.status(400).json({ 'message': 'No data available for update.' });
        } else {
            const prodId = parseInt(req.params.prod_id);
            let prodName, prodDescription, prodPrice;

            if (req.body.prod_name)
                prodName = req.body.prod_name;
            if (req.body.prod_description)
                prodDescription = req.body.prod_description;
            if (req.body.prod_price)
                prodPrice = req.body.prod_price;

            const data = await Product.findByPk(prodId);
            if (data !== null) {
                await Product.update({
                    prod_name: prodName,
                    prod_description: prodDescription,
                    prod_price: req.body.prod_price
                },
                    {
                        where: { prod_id: prodId }
                    }
                );
                return res.status(200).json({ 'message': `Row updated successfully with product id ${prodId}` });
            } else {
                return res.status(200).json({ 'message': `No data available for product id ${prodId}` });
            }
        }
    } catch (err: any) {
        console.error('Error in productController.updateProduct : ' + err.message);
    }
}

//delete product -- admin
const deleteProduct = async (req: Request, res: Response) => {
    try {
        console.log("In productController.deleteProduct");
        const productId = parseInt(req.params.prod_id);
        const data = await Product.findByPk(productId);
        if (data !== null) {
            const linkedOrder = await Order.findOne({ where: { prod_id: productId } });
            if (linkedOrder === null) {
                await Product.destroy({ where: { prod_id: productId } });
                return res.status(200).json({ 'message': `Row deleted successfully for product with id ${productId}` });
            } else {
                return res.status(200).json({ 'message': 'Cannot delete product as it is linked with an order.' })
            }
        } else {
            return res.status(200).json({ 'message': `No data available for product with id ${productId}` });
        }
    } catch (err: any) {
        console.error('Error in productController.deleteProduct : ' + err.message);
    }
}

module.exports = { getProductList, createProduct, updateProduct, deleteProduct, getProductById }