import { Request, Response } from 'express';
const { logEvents } = require('./logEvents');

const errorHandler = (err: Error, req: Request, res: Response) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt');
    res.status(500).send(err.message);
};

module.exports = errorHandler;