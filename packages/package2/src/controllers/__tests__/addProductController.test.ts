import { createProduct } from '../addProductController';
const addProductService = require('../../services/addProductService');
import { NextFunction, Request, Response } from 'express';
jest.mock('../../services/addProductService');

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
    it('should return status 201 on successful creation of product', async () => {
        request.body = {
            prod_name: "Product 76",
            prod_description: "Description 76",
            prod_price: "Rs 767"
        };
        const createRes = {
            status: 201,
            json: { "message": "New product created successfully!!" }
        }
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(null));
        addProductService.create = jest.fn().mockImplementation(() => Promise.resolve(createRes))
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': 'New product created successfully!!' })
        
    });

    it('should return status 500 when addProductService.create throws error', async () => {
        const error = new Error('Error')
        request.body = {
            prod_name: "Product 76",
            prod_description: "Description 76",
            prod_price: "Rs 767"
        };
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(null));
        addProductService.create = jest.fn().mockImplementation(() => Promise.reject(error))
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({"message": "Error"});
    });

    it('should return status 500 when addProductService.checkProduct throws error', async () => {
        const error = new Error('Error')
        request.body = {
            prod_name: "Product 76",
            prod_description: "Description 76",
            prod_price: "Rs 767"
        };
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.reject(error));
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({"message": "Error"});
    });

    it('should return status 409 when product is already available in the db', async () => {
        request.body = {
            prod_name: "Product 4",
            prod_description: "Description 4",
            prod_price: "Rs 7627"
        };
        const createRes = {
            status: 409,
            json: {'message': `Product with name: ${request.body.prod_name} already exists.`}
        }
        addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(createRes));
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(409);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': `Product with name: ${request.body.prod_name} already exists.` })
    });

    it('should return status 400 when there is no request body', async () => {
        request.body = {}
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': "Product name ,price and description are required." });
    });

    it('should return status 400 when there is no product name', async () => {
        request.body = {
            prod_description: 'Description of Product',
            prod_price: 'Rs 4352'
        }
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': "Product name ,price and description are required." });
    });

    it('should return status 400 when there is no product description', async () => {
        request.body = {
            prod_name: 'Product',
            prod_price: 'Rs 4352'
        }
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': "Product name ,price and description are required." });
    });

    it('should return status 400 when there is no product price', async () => {
        request.body = {
            prod_description: 'Description of Product',
            name: 'Product'
        }
        await createProduct(request as Request, mockResponse as Response);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ 'message': "Product name ,price and description are required." });
    });
});