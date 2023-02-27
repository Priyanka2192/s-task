import express, { Application } from 'express';
const bodyParser = require('body-parser');
const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/product', require('./src/routes/getProduct'));

export default app;