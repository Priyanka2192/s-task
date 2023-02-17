"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../utils/dbConnection"));
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
class Order extends sequelize_1.Model {
}
Order.init({
    order_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'id'
        }
    },
    prod_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product_1.default,
            key: 'prod_id'
        }
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: dbConnection_1.default,
    modelName: 'Order'
});
exports.default = Order;
