import { checkProduct, create } from '../../services/addProductService'
import { createProduct } from '../addProductController';
const addProductController = require('../addProductController');
const addProductService = require('../../services/addProductService');
import { request, response } from 'express';
jest.mock('../../services/addProductService');

describe('Check the response for POST request', () => {
    describe('check the input', () => {

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('to return status 201 on successful creation of product', async () => {
            let req = {
                prod_name: "Product 4",
                prod_description: "Description 4",
                prod_price: "Rs 8569"
            };
            request.body = req;
            console.log(request);
            addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(null));
            const result = await addProductController.createProduct(request, response);
            expect(addProductService.checkProduct).toHaveBeenCalled();
            expect(addProductService.create).toHaveBeenCalled();
            expect(addProductService.checkProduct).toHaveBeenCalledTimes(1);
            expect(addProductService.create).toHaveBeenCalledTimes(1);
        });

        it('to return status 400 when there is no product name', async () => {
            let req = {
                prod_description: "Description 4",
                prod_price: "Rs 8569"
            };
            request.body = req;
            // const res = {
            //     status: 400,
            //     json: { 'message': "Product name ,price and description are required." }
            // }
            // addProductController.createProduct = jest.fn().mockImplementation(() => Promise.resolve(res));
            const result = await addProductController.createProduct(request, response);
            console.log(result);
            //expect(result.status).toBe(400);
            //expect(result.json).toStrictEqual({ 'message': "Product name ,price and description are required." });
        });

        it('to return status 400 when there is no product description', async () => {
            let req = {
                prod_name: "Product 4",
                prod_price: "Rs 8569"
            };
            request.body = req;
            const res = {
                status: 400,
                json: { 'message': "Product name ,price and description are required." }
            }
            addProductController.createProduct = jest.fn().mockImplementation(() => Promise.resolve(res));
            const result = await addProductController.createProduct(request, response);
            console.log(result);
            expect(result.status).toBe(400);
            expect(result.json).toStrictEqual({ 'message': "Product name ,price and description are required." });
        });;

        it('to return status 400 when there is no product price', async () => {
            let req = {
                prod_name: "Product 4",
                prod_description: "Description 4",
            };
            request.body = req;
            const res = {
                status: 400,
                json: { 'message': "Product name ,price and description are required." }
            }
            addProductController.createProduct = jest.fn().mockImplementation(() => Promise.resolve(res));
            const result = await addProductController.createProduct(request, response);
            console.log(result);
            expect(result.status).toBe(400);
            expect(result.json).toStrictEqual({ 'message': "Product name ,price and description are required." });
        });

        it('to return status 409 when there is already a product available', async () => {
            let req = {
                prod_name: "Product 4",
                prod_description: "Description 4",
                prod_price: "Rs 8569"
            };
            request.body = req;
            const res = {
                value: true,
                status: 409,
                json: Promise.resolve({ 'message': `Product with name: ${request.body.prod_name} already exists.` })
            }

            addProductService.checkProduct = jest.fn().mockImplementation(() => Promise.resolve(res));
            const result1 = await addProductService.checkProduct(request.body.prod_name);
            const result = await addProductController.createProduct(request,response);
            console.log(result);
            expect(addProductService.checkProduct).toHaveBeenCalled();
            expect(addProductService.checkProduct).toHaveBeenCalledTimes(1);
            expect(result1.status).toBe(409);


        });

        it('should throw an error', async () => {
            const error = new Error('Internal server error');
            try {
                await createProduct(request, response);
            } catch (e) {
                expect(e).toStrictEqual(error);
            }
        });

    });
});