"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
class RolePermission extends sequelize_1.Model {
}
RolePermission.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    perm_id: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: dbConnection_1.default,
    modelName: 'RolePermission'
});
exports.default = RolePermission;
