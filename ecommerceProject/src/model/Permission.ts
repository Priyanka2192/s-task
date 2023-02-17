import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/dbConnection";

class Permission extends Model {
    static associate(models: any) {
        Permission.belongsToMany(models.Role, {
            through: 'RolePermission',
            as: 'roles',
            foreignKey: 'perm_id'
        });
    };
    declare id: number;
    declare perm_name: string;
    declare perm_description: string
};

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    perm_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    perm_description: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'Permission'
    }
);

export default Permission