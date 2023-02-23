import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConnection";

class Product extends Model {
    declare prod_id: number;
    declare prod_name: string;
    declare prod_description: string;
    declare prod_price: string;
}

Product.init({
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    prod_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prod_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prod_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Product'
});

export default Product;