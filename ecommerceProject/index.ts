import Product from './src/model/Product';
import User from './src/model//User';
import Order from './src/model//Order';
import Role from './src/model/Role';
import RolePermission from './src/model/RolePermission';
import Permission from './src/model/Permission';

const syncAllTables = async () => {
    await Product.sync().then(() => {
        console.log('Product table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    await User.sync().then(() => {
        console.log('User table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    await Role.sync().then(() => {
        console.log('Role table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    await Permission.sync().then(() => {
        console.log('Permission table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    await RolePermission.sync().then(() => {
        console.log('RolePermission table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

    await Order.sync().then(() => {
        console.log('Order table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
}

export default syncAllTables;