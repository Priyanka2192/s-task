import request = require('supertest');
jest.mock('node-fetch');
const fetch = require('node-fetch');
const app = require('../../app');

describe('Check the response for POST request', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should get status as 201', async () => {
        fetch.mockResolvedValue(Promise.resolve({
            json: () =>
                Promise.resolve({
                    "name": "alaska",
                    "job": "engineer"
                }),
        }));
        const response = await request(app).post('/add');
        expect(response.statusCode).toBe(201);
        expect(fetch).toHaveBeenCalledTimes(1);
        const res = {
            json: jest.fn(),
        };
        expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.body).toEqual({
            "name": "alaska",
            "job": "engineer",
            "id": fetch.any,
            "createdAt": fetch.any
        })
    });

    it('should return 500 as status code', async () => {
        fetch.mockReturnValue(() => Promise.reject('Internal Server Error'));
        const response = await request(app).post('/add');
        expect(fetch).toHaveBeenCalledTimes(1);
        const res = {
            json: jest.fn(),
        };
        expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.statusCode).toBe(500);
    });

   
});