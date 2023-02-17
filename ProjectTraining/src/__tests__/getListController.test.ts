import request = require('supertest');
jest.mock('node-fetch');
const fetch = require('node-fetch');
const app = require('../../app');

describe('Check the response for GET request', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get status as 200', async () => {
        fetch.mockResolvedValue({
            json() {
                return {
                    "name": "alaska",
                    "job": "engineer"
                };
            },
        });
        const response = await request(app).get('/list');
        expect(response.statusCode).toBe(200);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users?page=2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.body).toEqual({
            "name": "alaska",
            "job": "engineer"
        });
    });

    it('should return 500 as status code', async () => {
        fetch.mockReturnValue(() => Promise.reject('Internal Server Error'));
        const response = await request(app).get('/list');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('https://reqres.in/api/users?page=2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.statusCode).toBe(500);
    });
});