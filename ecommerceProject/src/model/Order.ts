import sequelize from '../utils/dbConnection';
import { Model, DataTypes } from 'sequelize';
import User from './User';
import Product from './Product';

class Order extends Model {
    declare order_id: number;
    declare user_id: number;
    declare prod_id: number;
}

Order.init({
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'prod_id'
        }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
    {
        sequelize,
        modelName: 'Order'
    }
);

export default Order