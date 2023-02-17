"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const dbConnection_1 = __importDefault(require("./src/utils/dbConnection"));
//import syncAllTables from './index';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = require('./src/utils/corsOptions');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
const verifyJWT = require('./src/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./src/middleware/credentials');
const app = (0, express_1.default)();
const PORT = process.env.PORT;
//custom middleware logger
app.use(logger);
dbConnection_1.default.authenticate().then(() => {
    console.log('Connection to database successful!!');
    //syncAllTables();
    dbConnection_1.default.sync();
    //handle options credentials check before cors and fetch cookies credentials requirement
    app.use(credentials);
    //Cross Origin Resource Sharing(cors)
    app.use((0, cors_1.default)(corsOptions));
    //built in middleware for json
    app.use(express_1.default.json());
    //built in middleware to handle urlencoded data - form data
    app.use(express_1.default.urlencoded({ extended: false }));
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
}).catch((err) => {
    console.error('Error message : ' + err.message);
});
