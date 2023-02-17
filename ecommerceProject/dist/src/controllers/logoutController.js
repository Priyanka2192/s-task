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
const User_1 = __importDefault(require("../model/User"));
//to logout the user
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //on client also delete the access token
    try {
        console.log('In logoutController.handleLogout');
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204); //no content to send back
        const refreshToken = cookies.jwt;
        //is refresh token present in db?
        const foundUser = yield User_1.default.findOne({ where: { refreshToken: refreshToken } });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }); // secure:true ,
            return res.sendStatus(204);
        }
        //delete refreshToken from db
        foundUser.refreshToken = '';
        yield foundUser.save();
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }); // secure:true ,
        res.sendStatus(204);
    }
    catch (err) {
        console.error('Error in logoutController.handleLogout : ' + err.message);
    }
});
module.exports = { handleLogout };
