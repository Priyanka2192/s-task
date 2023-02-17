import { Request, Response } from "express";
const fetch = require('node-fetch');

const addUser = async (req: Request, res: Response) => {
    const url =
        'https://reqres.in/api/users';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
}

export default { addUser };