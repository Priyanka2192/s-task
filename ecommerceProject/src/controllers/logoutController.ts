import { Request, Response } from 'express';
import User from '../model/User';

//to logout the user
const handleLogout = async (req: Request, res: Response) => {
    //on client also delete the access token
    try {
        console.log('In logoutController.handleLogout');
        const cookies = req.cookies;
        if (!cookies?.jwt)
            return res.sendStatus(204); //no content to send back
        const refreshToken = cookies.jwt;
        //is refresh token present in db?
        const foundUser = await User.findOne({ where: { refreshToken: refreshToken } });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }); // secure:true ,
            return res.sendStatus(204);
        }
        //delete refreshToken from db
        foundUser.refreshToken = '';
        await foundUser.save();
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none' }); // secure:true ,
        res.sendStatus(204);
    } catch (err: any) {
        console.error('Error in logoutController.handleLogout : ' + err.message);
    }
}

module.exports = { handleLogout }