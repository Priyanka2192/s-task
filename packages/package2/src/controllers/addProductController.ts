import { Request, Response } from 'express';
const addProductService = require('../services/addProductService');

//creates a product list 
export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log('In productController.createProduct');
        console.log(req.body);
        if (!req.body.prod_name || !req.body.prod_description || !req.body.prod_price) {
            return res.status(400).json({ 'message': "Product name ,price and description are required." });
        } else {
            let prodName = req.body.prod_name;
            console.log(prodName);
            const checkProductAvailable = await addProductService.checkProduct(prodName);
            if (checkProductAvailable)
                 res.status(409).json({ 'message': `Product with name: ${req.body.prod_name} already exists.` }); //conflict

            console.log(req.body);
            await addProductService.create(req.body);
            res.status(201).json({ 'message': 'New product created successfully!!' });
        }
    } catch (err: any) {
        console.error('Error in productController.createProduct : ' + err.message);
               
    }
}

module.exports = { createProduct }
