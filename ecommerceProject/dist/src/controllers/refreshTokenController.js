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
const jwt = require('jsonwebtoken');
//to generate access token for gin user on its expiry
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In refreshTokenController.handleRefreshToken');
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(401);
        const refreshToken = cookies.jwt;
        const foundUser = yield User_1.default.findOne({ where: { refreshToken: refreshToken } });
        if (!foundUser)
            return res.sendStatus(403); //forbidden
        //evaluate jwt
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.user_email !== decoded.user_email)
                return res.sendStatus(403);
            const accessToken = jwt.sign({
                "UserInfo": {
                    "user_login_email": decoded.user_email,
                    "user_role_id": foundUser.role_id,
                    "user_id": foundUser.id
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            return res.json({ accessToken });
        });
    }
    catch (err) {
        console.error('Error in refreshTokenController.handleRefreshToken : ' + err.message);
    }
});
module.exports = { handleRefreshToken };
