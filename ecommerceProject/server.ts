require('dotenv').config();
import sequelize from './src/utils/dbConnection';
//import syncAllTables from './index';
import express, { Application } from 'express';
import cors from 'cors';
const corsOptions = require('./src/utils/corsOptions');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./src/middleware/credentials');
const app: Application = express();
const PORT = process.env.PORT;

//custom middleware logger
app.use(logger);

sequelize.authenticate().then(() => {
    console.log('Connection to database successful!!');
    //syncAllTables();
    sequelize.sync();

    //handle options credentials check before cors and fetch cookies credentials requirement
    app.use(credentials);

    //Cross Origin Resource Sharing(cors)
    app.use(cors(corsOptions));

    //built in middleware for json
    app.use(express.json());

    //built in middleware to handle urlencoded data - form data
    app.use(express.urlencoded({ extended: false }));

    //middleware for cookies
    app.use(cookieParser());

    //routes
    app.use('/register', require('./src/routes/registerUser'));
    app.use('/login', require('./src/routes/login'));
    app.use('/refresh', require('./src/routes/refreshToken'));
    app.use('/logout', require('./src/routes/logout'));
    app.use(verifyJWT);
    app.use('/user', require('./src/routes/user'));
    app.use('/product', require('./src/routes/product'));
    app.use('/order', require('./src/routes/order'));

    //middleware to log error
    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch((err: Error) => {
    console.error('Error message : ' + err.message);
});