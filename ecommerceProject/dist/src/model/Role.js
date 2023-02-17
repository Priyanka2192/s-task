"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
class Role extends sequelize_1.Model {
    static associate(models) {
        Role.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Role.belongsToMany(models.Permission, {
            through: 'RolePermission',
            as: 'permissions',
            foreignKey: 'role_id'
        });
    }
    ;
}
;
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: dbConnection_1.default,
    modelName: 'Role'
});
exports.default = Role;
