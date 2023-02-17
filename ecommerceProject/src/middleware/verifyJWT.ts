import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
   
    if (!authHeader?.startsWith('Bearer '))
        return res.sendStatus(401);//unauthorize

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err)
                return res.sendStatus(403);//invalid token
            req.body.user_login_email = decoded.UserInfo.user_login_email;
            req.body.user_role_id = decoded.UserInfo.user_role_id;
            req.body.user_id = decoded.UserInfo.user_id;
            next();
        }
    );
};

module.exports = verifyJWT;