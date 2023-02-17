require("dotenv").config();
import express, { Request, Response } from 'express';
import User from '../model/User';
const jwt = require('jsonwebtoken');

//to generate access token for gin user on its expiry
const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        console.log('In refreshTokenController.handleRefreshToken');
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        const foundUser = await User.findOne({ where: { refreshToken: refreshToken } });
        if (!foundUser)
            return res.sendStatus(403); //forbidden
        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err: any, decoded: any) => {
                if (err || foundUser.user_email !== decoded.user_email)
                    return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo":
                        {
                            "user_login_email": decoded.user_email,
                            "user_role_id": foundUser.role_id,
                            "user_id": foundUser.id
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
                );
                return res.json({ accessToken });
            }
        )
    } catch (err: any) {
        console.error('Error in refreshTokenController.handleRefreshToken : ' + err.message);
    }
}

module.exports = { handleRefreshToken }