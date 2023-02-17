import { Dialect, Sequelize } from "sequelize";

const dbName = process.env.DATABASE as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        dialect: dbDriver,
        logging: false
    }
);

export default sequelize;