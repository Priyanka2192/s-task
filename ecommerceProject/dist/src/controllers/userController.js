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
//create new user -- Customer,Admin
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In userController.createNewUser');
        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname || !req.body.user_phone)
            return res.status(400).json({ 'message': 'User email,password,fullname and phone are required!' });
        const checkDuplicateUser = yield User_1.default.findOne({ where: { user_email: req.body.user_email } });
        if (checkDuplicateUser)
            return res.status(409).json({ 'message': `User with email: ${req.body.user_email} already exists.` }); //conflict
        //encrypt the password
        const hashedPwd = yield bcrypt_1.default.hash(req.body.user_password, 10);
        yield User_1.default.create({
            user_email: req.body.user_email,
            user_password: hashedPwd,
            user_fullname: req.body.user_fullname,
            user_phone: req.body.user_phone
        });
        return res.status(201).json({ 'message': 'New user created successfully!!' });
    }
    catch (err) {
        console.error('Error in creating new user in userController.createNewUser ' + err.message);
    }
});
//fetch all users from db -- Customer,Support,Admin
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In userController.getAllUsers');
        const data = yield User_1.default.findAll({
            attributes: ['user_email', 'user_fullname', 'user_phone']
        });
        res.status(200).json(data);
    }
    catch (err) {
        console.error('Error in userController.getAllUsers ' + err.message);
    }
});
//get single user details from db -- Customer,Support,Admin
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In userController.getUserById");
        const userId = parseInt(req.params.user_id);
        const data = yield User_1.default.findByPk(userId);
        if (data !== null)
            return res.status(200).json(data);
        return res.status(200).json({ 'message': `No data available for user with id ${userId}` });
    }
    catch (err) {
        console.error('Error in userController.getUserById : ' + err.message);
    }
});
//update user -- Customer,Admin
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In userController.updateUser');
        if (!Object.keys(req.body).length)
            res.status(400).json({ 'message': 'No data available for update.' });
        const userId = parseInt(req.params.user_id);
        let userEmail, userPassword, userFullname, userPhone;
        if (req.body.user_email)
            userEmail = req.body.user_email;
        if (req.body.user_password)
            userPassword = yield bcrypt_1.default.hash(req.body.user_password, 10);
        if (req.body.user_fullname)
            userFullname = req.body.user_fullname;
        if (req.body.user_phone)
            userPhone = req.body.user_phone;
        const data = yield User_1.default.findByPk(userId);
        if (data !== null) {
            yield User_1.default.update({
                user_email: userEmail,
                user_password: userPassword,
                user_fullname: userFullname,
                user_phone: userPhone
            }, {
                where: { id: userId }
            });
            return res.status(200).json({ 'message': `Row updated successfully with user id ${userId}` });
        }
        else {
            return res.status(200).json({ 'message': `No data available for user id ${userId}` });
        }
    }
    catch (err) {
        console.error('Error in userController.updateUser ' + err.message);
    }
});
//delete user -- Customer,Admin
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("In userController.deleteUser");
        const userId = parseInt(req.params.user_id);
        const data = yield User_1.default.findByPk(userId);
        if (data !== null) {
            yield User_1.default.destroy({ where: { id: userId } });
            return res.status(200).json({ 'message': `Row deleted successfully for user with id ${userId}` });
        }
        else {
            return res.status(200).json({ 'message': `No data available for user with id ${userId}` });
        }
    }
    catch (err) {
        console.error('Error in userController.deleteUser : ' + err.message);
    }
});
module.exports = { createNewUser, getAllUsers, getUserById, updateUser, deleteUser };
