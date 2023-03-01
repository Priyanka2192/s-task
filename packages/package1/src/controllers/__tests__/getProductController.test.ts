import { NextFunction,Request, Response } from 'express';
import { getProductList } from '../getProductcontroller';
const getProductService = require('../../services/getProductService')
jest.mock('../../services/getProductService')

let mockResponse: Function
let responseBody: any = {}
let status: number
let request: Partial<Request> = {}
// let next: Partial<NextFunction> = {}

beforeEach(() => {
    responseBody = {}
    request = {}
    status = 0
    // next = jest.fn().mockImplementation()
    mockResponse = () => {
        const res: any = {};
        res.status = jest.fn().mockImplementation((statusCode: number) => {
            status = statusCode
            return res
        })
        res.json = jest.fn().mockImplementation((result: any) => {
            responseBody = result
        })
        return res;
    };
    jest.clearAllMocks();
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
        const result = await getProductList(request as Request, mockResponse() as Response);
        expect(status).toBe(200);
        console.log(responseBody);
        expect(responseBody).toEqual([{
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
        await getProductList(request as Request, mockResponse() as Response);
        expect(status).toBe(500);
    });
});