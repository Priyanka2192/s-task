import { Request, Response } from "express";
const fetch = require('node-fetch');

const getListOfUsers = async (req:Request ,res:Response) => {

    const url = 'https://reqres.in/api/users?page=2';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        res.status(200).send(result);
    } catch (err: any) {
        res.status(500).send(err);
    }
}

export default  {getListOfUsers };