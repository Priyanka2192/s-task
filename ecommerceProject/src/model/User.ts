import { Model, DataTypes, ModelStatic } from "sequelize";
import sequelize from "../utils/dbConnection";

class User extends Model {
    static associate(models: any) {
        User.hasOne(models.Role, {
            foreignKey: 'user_id',
            as: 'role'
        });
    };
    declare id: number;
    declare role_id: number;
    declare user_email: string;
    declare user_password: string;
    declare user_fullname: string;
    declare user_phone: string;
    declare refreshToken: string;

};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    refreshToken: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
    {
        sequelize,
        modelName: 'User'
    }

);

export default User;