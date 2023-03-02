import { Request, Response } from 'express';
const getProductService = require('../services/getProductService');

export const getProductList = async (req: Request, res: Response) => {
    try {
        console.log("In productController.getProductList");
        const data = await getProductService.getProduct();
        return res.status(200).json(data);
    } catch (err: any) {
        console.error('Error in getProductController.getProductList :' + err.message)
        return res.status(500).json({'message':`${err.message}`})
    }
}
 module.exports = {getProductList}