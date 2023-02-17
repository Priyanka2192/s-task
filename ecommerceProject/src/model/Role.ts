import { Model, DataTypes, ModelStatic, Sequelize } from "sequelize";
import sequelize from "../utils/dbConnection";

class Role extends Model {
    static associate(models: any) {
        Role.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        Role.belongsToMany(models.Permission, {
            through: 'RolePermission',
            as: 'permissions',
            foreignKey: 'role_id'
        });
    };
    declare id: number;
    declare role_name: string;
    declare role_description: string

};

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
    {
        sequelize,
        modelName: 'Role'
    }
);

export default Role