import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/dbConnection";

class RolePermission extends Model {
    declare id: number;
    declare role_id: number;
    declare perm_id: number;
}

RolePermission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_id: {
        type: DataTypes.INTEGER
    },
    perm_id: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize,
        modelName: 'RolePermission'
    }
);

export default RolePermission