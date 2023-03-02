import { NextFunction,Request, Response } from 'express';
import { getProductList } from '../getProductcontroller';
const getProductService = require('../../services/getProductService')
jest.mock('../../services/getProductService')

let mockResponse: Partial<Response> = {}
let request: Partial<Request> = {}

beforeEach(() => {
    jest.clearAllMocks();
    mockResponse = {}
    request = {}
    mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
})

describe('Check the response for POST request', () => {
    it('to return status 200 on successful fetch of product list', async () => {
        let data = [{
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
        }];
        getProductService.getProduct = jest.fn().mockImplementation(() => Promise.resolve(data))
        await getProductList(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([{
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
        }]);
 });

    it('should throw an error with status 500', async () => {
        const error = new Error('Internal server error');
        getProductService.getProduct = jest.fn().mockImplementation(() => Promise.reject(error))
        await getProductList(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({"message": "Internal server error"})
    });
});