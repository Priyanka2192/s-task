import RolePermission from '../model/RolePermission';
import Permission from '../model/Permission';
import { NextFunction, Request, Response } from 'express';

const verifyRoles = (permName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("In verifyRoles");
            const roleId = req.body.user_role_id;
            const data = await Permission.findOne({ where: { perm_name: permName } });
            const data1 = await RolePermission.findOne({ where: { role_id: roleId, perm_id: data?.id } });
            if (data1 === null) {
                res.status(403).json({ 'message': 'No permission to execute this action.' });
            } else {
                next();
            }
        } catch (err: any) {
            console.error('Error in verifyRoles : ' + err.message);
        }
    }
};

export default verifyRoles;