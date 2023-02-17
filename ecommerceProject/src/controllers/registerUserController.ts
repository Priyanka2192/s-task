import User from '../model/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Role from '../model/Role';
import { nextDay } from 'date-fns';
import sequelize from '../utils/dbConnection';
const { QueryTypes } = require('sequelize');

//register new user
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('In registerUserController.registerUser');
        const roleName = req.params.role_name;
        const roleData = await Role.findOne({ where: { role_name: `${roleName}` } })
        const roleId = roleData?.id;

        if (!req.body.user_email || !req.body.user_password || !req.body.user_fullname || !req.body.user_phone)
            return res.status(400).json({ 'message': 'User email , fullname ,phone and password are required!' });
        const checkDuplicateUser = await User.findOne({ where: { user_email: req.body.user_email } });
        if (checkDuplicateUser)
            return res.status(409).json({ 'message': `User with email: ${req.body.user_email} already exists.` }); //conflict

        //encrypt the password
        const hashedPwd = await bcrypt.hash(req.body.user_password, 10);
        await User.create({
            role_id: roleId,
            user_email: req.body.user_email,
            user_password: hashedPwd,
            user_fullname: req.body.user_fullname,
            user_phone: req.body.user_phone
        });
        return res.status(201).json({ 'message': 'New user created successfully!!' });
    } catch (err: any) {
        console.error('Error in creating new user in registerUserController.registerUser ' + err.message);
    }
}

module.exports = { registerUser }