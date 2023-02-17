import { NextFunction, Request, Response } from 'express';
import path = require('path');
import fs from 'fs';
const fsPromises = require('fs').promises;
import { format } from 'date-fns';
const { v4: uuid } = require('uuid');

const logEvents = async (message: string, logName: string) => {

    const dateTime = `${format(new Date(), 'dd-MM-yyyy \t HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err: any) {
        console.error(err.message);
    }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestLog.txt');
    next();
};

module.exports = { logger, logEvents };