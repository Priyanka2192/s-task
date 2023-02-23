import { Dialect, Sequelize } from "sequelize";

const dbName = process.env.DATABASE as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
//const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPort = 3306;

const mockSequelize = new Sequelize(
    'ecommerceProjectdb',
    'root',
    'Bounteous@2918',
    
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        port: 3306,
    }
);
// sequelize.authenticate().then(() => {
//     console.log('Connection to database successful!!');
//     sequelize.sync();
// }).catch((err: any) => {
//     console.error('Error message : ' + err.message);
// });

export default mockSequelize;