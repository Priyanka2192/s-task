"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401); //unauthorize
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403); //invalid token
        req.body.user_login_email = decoded.UserInfo.user_login_email;
        req.body.user_role_id = decoded.UserInfo.user_role_id;
        req.body.user_id = decoded.UserInfo.user_id;
        next();
    });
};
module.exports = verifyJWT;
