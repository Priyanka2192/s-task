jest.mock('../src/services/getProductService.ts');
// jest.mock('../src/config/dbConnection.ts')
import request = require('supertest');
import app from 'package1/app';
import { getProduct } from '../src/services/getProductService';
import { Dialect, Sequelize } from "sequelize";
import sequelize from '../src/config/dbConnection';

describe('Check the response for GET request', () => {
        // beforeAll(async () => {
        //        // const mockSequelize = new Sequelize('mysql://localhost:3306/test_ecommerceProjectdb', {}) as unknown as jest.Mock;
        //          const sequelize = new Sequelize('mysql://localhost:3306/test_ecommerceProjectdb', {})
        //         const connection = sequelize.authenticate().then(() => {
        //                 console.log('DB connection established successfully')
        //         }).catch(err => {
        //                 console.log('Unable to connect to DB', err);
        //         });
        // });

        beforeEach(() => {
                jest.clearAllMocks();
        });

        test('should respond with 200 status code', async () => {
                const data = [
                        {
                                prod_id: 1,
                                prod_name: "Product 1",
                                prod_description: "Description 1",
                                prod_price: "Rs 5300"
                        },
                        {
                                prod_id: 2,
                                prod_name: "Product 2",
                                prod_description: "Description 2",
                                prod_price: "Rs 678"
                        },
                        {
                                prod_id: 3,
                                prod_name: "Product 3",
                                prod_description: "Description 3",
                                prod_price: "Rs 6758"
                        }
                ];
                const getProductMock = getProduct as jest.Mock;
                getProductMock.mockResolvedValue(data);
                const response = await request(app).get('/product');
                expect(response.statusCode).toBe(200);
                expect(getProductMock).toHaveBeenCalledTimes(1);
                 console.log(response.body);
                // console.log(response);
                expect(response.body).toEqual([
                        {
                                prod_id: 1,
                                prod_name: "Product 1",
                                prod_description: "Description 1",
                                prod_price: "Rs 5300"
                        },
                        {
                                prod_id: 2,
                                prod_name: "Product 2",
                                prod_description: "Description 2",
                                prod_price: "Rs 678"
                        },
                        {
                                prod_id: 3,
                                prod_name: "Product 3",
                                prod_description: "Description 3",
                                prod_price: "Rs 6758"
                        }
                ]);
        });

        test('should fail with error', async () => {
                const error = new Error('Internal server error!')
                const getProductMock = getProduct as jest.Mock;
                getProductMock.mockRejectedValue(error);
                const response = await request(app).get('/product');
                expect(response.statusCode).toBe(500);
                expect(getProductMock).toHaveBeenCalledTimes(1);
        });
});