import Product from 'package1/src/model/product';
import { checkProduct, create } from '../addProductService';
jest.mock('package1/src/model/product')

describe('To test the addProductService file', () => {
    describe('to test the function checkProduct', () => {

        it('should return null if product is not available', async () => {
            const prodName = 'Product 1';
            Product.findOne = jest.fn().mockImplementation(() => Promise.resolve(null));
            const response = await checkProduct(prodName);
            expect(Product.findOne).toHaveBeenCalled();
            expect(Product.findOne).toHaveBeenCalledTimes(1);
            expect(response).toBeNull;
        });

        it('should return data when product is available', async () => {
            const prodName = 'Product 1';
            Product.findOne = jest.fn().mockImplementation(() => Promise.resolve({ Product: { datavalues: { prod_name: prodName } } }));
            const response = await checkProduct(prodName);
            expect(Product.findOne).toHaveBeenCalled();
            expect(Product.findOne).toHaveBeenCalledTimes(1);
            expect(response).toEqual({ Product: { datavalues: { prod_name: prodName } } });
        });

        it('should return error', async () => {
            const error = new Error('Internal server error');
            const prodName = 'Product 1';
            Product.findOne = jest.fn().mockImplementation(() => Promise.reject(error));
            const response = await checkProduct(prodName);
            expect(Product.findOne).toHaveBeenCalled();
            expect(Product.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('to test the function create', () => {

        it('should return data when product is created', async () => {
            const prodDetails = {
                prod_name: 'Product 4',
                prod_description: 'Description 3',
                prod_price: 'Rs 6758',
            };
            Product.create = jest.fn().mockImplementation(() => Promise.resolve({
                Product: {
                    dataValues: {
                        prod_id: expect.any,
                        prod_name: 'Product 4',
                        prod_description: 'Description 3',
                        prod_price: 'Rs 6758',
                        updatedAt: expect.any,
                        createdAt: expect.any,
                    }
                }
            }));
            const response = await create(prodDetails);
            expect(Product.create).toHaveBeenCalled();
            expect(Product.create).toHaveBeenCalledTimes(1)
        });

        it('should return error when product is not created', async () => {
            const error = new Error('Internal server error');
            const prodDetails = {
                prod_name: 'Product 4',
                prod_description: 'Description 3',
                prod_price: 'Rs 6758',
            };
            Product.create = jest.fn().mockImplementation(() => Promise.reject(error));
            const response = await create(prodDetails);
            expect(Product.create).toHaveBeenCalled();
            expect(Product.create).toHaveBeenCalledTimes(1);
        });
    });
})