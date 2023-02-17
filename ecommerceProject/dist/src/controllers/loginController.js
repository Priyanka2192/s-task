"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const User_1 = __importDefault(require("../model/User"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//to login a registered user
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In loginController.handleLogin');
        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname)
            return res.status(400).json({ 'message': 'User email , fullname and password are required!' });
        const foundUser = yield User_1.default.findOne({
            where: {
                user_email: req.body.user_email,
                user_fullname: req.body.user_fullname
            }
        });
        if (!foundUser)
            return res.sendStatus(401); //unauthorize
        //evaluate password
        const match = yield bcrypt.compare(req.body.user_password, foundUser.user_password);
        if (match) {
            //create JWTs
            const accessToken = jwt.sign({
                "UserInfo": {
                    "user_login_email": foundUser.user_email,
                    "user_role_id": foundUser.role_id,
                    "user_id": foundUser.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            const refreshToken = jwt.sign({
                "user_email": foundUser.user_email,
            }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
            //saving refresh token with current user
            foundUser.refreshToken = refreshToken;
            yield foundUser.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }); //secure: true, 
            return res.json({ accessToken });
        }
        else {
            res.sendStatus(401); //unauthorize
        }
    }
    catch (err) {
        console.error('Error in loginController.handleLogin : ' + err.message);
    }
});
module.exports = { handleLogin };
