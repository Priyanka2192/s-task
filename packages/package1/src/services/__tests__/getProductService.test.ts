import Product from "../../model/product";
import {getProduct}  from "../getProductService";
jest.mock('../../model/product');

describe('test the getProduct function', () => {
    it('should return data on successful fetch', async () => {
        Product.findAll = jest.fn().mockImplementation(() => Promise.resolve([
            {
                "prod_id": 1,
                "prod_name": "Product 1",
                "prod_description": "Description 1",
                "prod_price": "Rs 5300"
            },
            {
                "prod_id": 2,
                "prod_name": "Product 2",
                "prod_description": "Description 2",
                "prod_price": "Rs 678"
            }
        ]));
        const response = await getProduct();
        expect(Product.findAll).toHaveBeenCalled();
        expect(Product.findAll).toHaveBeenCalledTimes(1);
        expect(response).toEqual([
            {
                "prod_id": 1,
                "prod_name": "Product 1",
                "prod_description": "Description 1",
                "prod_price": "Rs 5300"
            },
            {
                "prod_id": 2,
                "prod_name": "Product 2",
                "prod_description": "Description 2",
                "prod_price": "Rs 678"
            }
        ]);
    });

    it('should return error', async () => {
        const error = new Error('Internal server error');
        Product.findAll = jest.fn().mockImplementation(() => Promise.reject(error));
        await getProduct();
        expect(Product.findAll).toHaveBeenCalled();
        expect(Product.findAll).toHaveBeenCalledTimes(1);
    })
})