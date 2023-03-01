import { createProduct } from '../addProductController';
const addProductService = require('../../services/addProductService');
import { NextFunction, Request, Response } from 'express';
jest.mock('../../services/addProductService');

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
    it('to return status 201 on successful creation of product', async () => {
        request.body = {
            prod_name: "Product 76",
            prod_description: "Description 76",
            prod_price: "Rs 767"
        };
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(null));
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(201);
        expect(responseBody).toEqual({ "message": "New product created successfully!!" })
    });

    it('should throw an error with status 500', async () => {
        // request = {}
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(500);
    });

    it('should return status 409 when product is already available in the db', async () => {
        request.body = {
            prod_name: "Product 4",
            prod_description: "Description 4",
            prod_price: "Rs 7627"
        };
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(true));
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(409);
        expect(responseBody).toEqual({ 'message': `Product with name: ${request.body.prod_name} already exists.` })
    });

    it('should return status 400 when there is no request body', async () => {
        request.body = {}
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(400);
        expect(responseBody).toEqual({ 'message': "Product name ,price and description are required." })
    });

    it('should return status 400 when there is no product name', async () => {
        request.body = {
            prod_description: 'Description of Product',
            prod_price: 'Rs 4352'
        }
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(400);
        expect(responseBody).toEqual({ 'message': "Product name ,price and description are required." })
    });

    it('should return status 400 when there is no product description', async () => {
        request.body = {
            prod_name: 'Product',
            prod_price: 'Rs 4352'
        }
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(400);
        expect(responseBody).toEqual({ 'message': "Product name ,price and description are required." })
    });

    it('should return status 400 when there is no product price', async () => {
        request.body = {
            prod_description: 'Description of Product',
            name: 'Product'
        }
        await createProduct(request as Request, mockResponse() as Response);
        expect(status).toBe(400);
        expect(responseBody).toEqual({ 'message': "Product name ,price and description are required." })
    });
});