import User from '../model/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Order from '../model/Order';

//create new user -- Customer,Admin
const createNewUser = async (req: Request, res: Response) => {
    try {
        console.log('In userController.createNewUser');
        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname || !req.body.user_phone)
            return res.status(400).json({ 'message': 'User email,password,fullname and phone are required!' });
        const checkDuplicateUser = await User.findOne({ where: { user_email: req.body.user_email } });
        if (checkDuplicateUser)
            return res.status(409).json({ 'message': `User with email: ${req.body.user_email} already exists.` }); //conflict

        //encrypt the password
        const hashedPwd = await bcrypt.hash(req.body.user_password, 10);
        await User.create({
            user_email: req.body.user_email,
            user_password: hashedPwd,
            user_fullname: req.body.user_fullname,
            user_phone: req.body.user_phone
        });
        return res.status(201).json({ 'message': 'New user created successfully!!' });
    } catch (err: any) {
        console.error('Error in creating new user in userController.createNewUser ' + err.message);
    }
}

//fetch all users from db -- Customer,Support,Admin
const getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log('In userController.getAllUsers');
        const data: User[] | null = await User.findAll({
            attributes: ['user_email', 'user_fullname', 'user_phone']
        });
        res.status(200).json(data);
    } catch (err: any) {
        console.error('Error in userController.getAllUsers ' + err.message);
    }
}

//get single user details from db -- Customer,Support,Admin
const getUserById = async (req: Request, res: Response) => {
    try {
        console.log("In userController.getUserById");
        const userId = parseInt(req.params.user_id);
        const data: User | null = await User.findByPk(userId);
        if (data !== null)
            return res.status(200).json(data);
        return res.status(200).json({ 'message': `No data available for user with id ${userId}` });
    } catch (err: any) {
        console.error('Error in userController.getUserById : ' + err.message);
    }
}

//update user -- Customer,Admin
const updateUser = async (req: Request, res: Response) => {
    try {
        console.log('In userController.updateUser');
        if (Object.keys(req.body).length <= 3) {
            res.status(400).json({ 'message': 'No data available for update.' });
        } else {
            const userId = parseInt(req.params.user_id);
            let userEmail, userPassword, userFullname, userPhone;

            if (req.body.user_email)
                userEmail = req.body.user_email;
            if (req.body.user_password)
                userPassword = await bcrypt.hash(req.body.user_password, 10);
            if (req.body.user_fullname)
                userFullname = req.body.user_fullname;
            if (req.body.user_phone)
                userPhone = req.body.user_phone;

            const data = await User.findByPk(userId);
            if (data !== null) {
                await User.update({
                    user_email: userEmail,
                    user_password: userPassword,
                    user_fullname: userFullname,
                    user_phone: userPhone
                },
                    {
                        where: { id: userId }
                    }
                );
                return res.status(200).json({ 'message': `Row updated successfully with user id ${userId}` });
            } else {
                return res.status(200).json({ 'message': `No data available for user id ${userId}` });
            }
        }
    } catch (err: any) {
        console.error('Error in userController.updateUser ' + err.message);
    }
}

//delete user -- Customer,Admin
const deleteUser = async (req: Request, res: Response) => {
    try {
        console.log("In userController.deleteUser");
        const userId = parseInt(req.params.user_id);
        const data = await User.findByPk(userId);
        if (data !== null) {
            const linkedOrder = await Order.findOne({ where: { user_id: userId } });
            if (linkedOrder === null) {
                await User.destroy({ where: { id: userId } });
                return res.status(200).json({ 'message': `Row deleted successfully for user with id ${userId}` });
            } else {
                return res.status(200).json({ 'message': 'Cannot delete User as it is linked with an order.' })
            }
        } else {
            return res.status(200).json({ 'message': `No data available for user with id ${userId}` });
        }
    } catch (err: any) {
        console.error('Error in userController.deleteUser : ' + err.message);
    }
}

module.exports = { createNewUser, getAllUsers, getUserById, updateUser, deleteUser }