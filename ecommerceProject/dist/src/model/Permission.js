"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
class Permission extends sequelize_1.Model {
    static associate(models) {
        Permission.belongsToMany(models.Role, {
            through: 'RolePermission',
            as: 'roles',
            foreignKey: 'perm_id'
        });
    }
    ;
}
;
Permission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    perm_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    perm_description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbConnection_1.default,
    modelName: 'Permission'
});
exports.default = Permission;
