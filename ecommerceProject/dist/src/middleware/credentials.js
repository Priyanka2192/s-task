"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const allowedOrigins = require('../utils/allowedOrigins');
const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:8080'
];
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(String(origin))) {
        res.header('Access-Control-Allow-Credentials', new Boolean(true).toString());
    }
    next();
};
module.exports = credentials;
