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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_1 = __importDefault(require("../model/Role"));
const { QueryTypes } = require('sequelize');
//register new user
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In registerUserController.registerUser');
        const roleName = req.params.role_name;
        const roleData = yield Role_1.default.findOne({ where: { role_name: `${roleName}` } });
        const roleId = roleData === null || roleData === void 0 ? void 0 : roleData.id;
        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname || !req.body.user_phone)
            return res.status(400).json({ 'message': 'User email , fullname ,phone and password are required!' });
        const checkDuplicateUser = yield User_1.default.findOne({ where: { user_email: req.body.user_email } });
        if (checkDuplicateUser)
            return res.status(409).json({ 'message': `User with email: ${req.body.user_email} already exists.` }); //conflict
        //encrypt the password
        const hashedPwd = yield bcrypt_1.default.hash(req.body.user_password, 10);
        yield User_1.default.create({
            role_id: roleId,
            user_email: req.body.user_email,
            user_password: hashedPwd,
            user_fullname: req.body.user_fullname,
            user_phone: req.body.user_phone
        });
        return res.status(201).json({ 'message': 'New user created successfully!!' });
    }
    catch (err) {
        console.error('Error in creating new user in registerUserController.registerUser ' + err.message);
    }
});
module.exports = { registerUser };
