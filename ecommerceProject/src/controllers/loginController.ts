require("dotenv").config();
import express, { Request, Response } from 'express';
import User from '../model/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//to login a registered user
const handleLogin = async (req: Request, res: Response) => {
    try {
        console.log('In loginController.handleLogin');
        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname)
            return res.status(400).json({ 'message': 'User email , fullname and password are required!' });
        const foundUser = await User.findOne(
            {
                where:
                {
                    user_email: req.body.user_email,
                    user_fullname: req.body.user_fullname
                }
            });
        if (!foundUser)
            return res.sendStatus(401); //unauthorize
        //evaluate password
        const match = await bcrypt.compare(req.body.user_password, foundUser.user_password);
        if (match) {
            //create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo":
                    {
                        "user_login_email": foundUser.user_email,
                        "user_role_id": foundUser.role_id,
                        "user_id": foundUser.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
            const refreshToken = jwt.sign(
                {
                    "user_email": foundUser.user_email,
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
            );
            //saving refresh token with current user
            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' });//secure: true, 
            return res.json({ accessToken });
        } else {
            res.sendStatus(401);//unauthorize
        }
    } catch (err: any) {
        console.error('Error in loginController.handleLogin : ' + err.message);
    }
}

module.exports = { handleLogin };