"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasOne(models.Role, {
            foreignKey: 'user_id',
            as: 'role'
        });
    }
    ;
}
;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 3
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: dbConnection_1.default,
    modelName: 'User'
});
exports.default = User;
