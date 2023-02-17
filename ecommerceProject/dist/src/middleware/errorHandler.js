"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { logEvents } = require('./logEvents');
const errorHandler = (err, req, res) => {
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt');
    res.status(500).send(err.message);
};
module.exports = errorHandler;
