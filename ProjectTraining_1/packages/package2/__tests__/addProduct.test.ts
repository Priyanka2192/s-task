import request = require('supertest');
import app from '../index';
// import { create,checkProduct} from '../src/services/addProductService';
import { create } from '../src/services/addProductService';
jest.mock('../src/services/addProductService.ts');

describe('Check the response for POST request', () => {
    test('should respond with 201 status code on create function', async () => {
        const data = {
            prod_id: 4,
            prod_name: "Product 4",
            prod_description: "Description 4",
            prod_price: "Rs 8569",
        };
        // const checkProductMock = checkProduct as jest.Mock;
        // checkProductMock.mockResolvedValue(() => {return true})

        const createMock = create as jest.Mock;
        createMock.mockResolvedValue(data);

        const response = await request(app).post('/product')
        expect(response.statusCode).toBe(201);
        expect(createMock).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({
            message: "New product created successfully!!"
        })
    });

    test('should fail with error for create function', async () => {
        const error = new Error('Internal server error!')
        const createMock = create as jest.Mock;
        createMock.mockRejectedValue(error);
        const response = await request(app).post('/product');
        expect(response.statusCode).toBe(500);
    });
});