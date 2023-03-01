import { Request, Response } from 'express';
const getProductService = require('../services/getProductService');

export const getProductList = async (req: Request, res: Response) => {
    try {
        console.log("In productController.getProductList");
        const data = await getProductService.getProduct();
        res.status(200).json(data);
    } catch (err: any) {
        console.error('Error in getProductController.getProductList :' + err.message)
        res.status(500).json(err);
    }
}
 module.exports = {getProductList}