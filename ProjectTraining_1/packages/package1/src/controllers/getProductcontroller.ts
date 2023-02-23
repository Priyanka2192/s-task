import { Request, Response } from 'express';
const getProductService = require('../services/getProductService');

const getProductList = async (req: Request, res: Response) => {
    try {
        console.log("In productController.getProductList");
        const data = await getProductService.getProduct();
        res.status(200).json(data);
    } catch (err: any) {
        res.status(500).send(err);
        //console.error('Error in productController.getProductList : ' + err.message);
    }
}
module.exports = {getProductList}