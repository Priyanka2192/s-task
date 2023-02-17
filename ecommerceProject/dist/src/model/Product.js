"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
class Product extends sequelize_1.Model {
}
Product.init({
    prod_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    prod_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    prod_description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    prod_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: dbConnection_1.default,
    modelName: 'Product'
});
exports.default = Product;
